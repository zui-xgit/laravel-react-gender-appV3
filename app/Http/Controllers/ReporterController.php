<?php

namespace App\Http\Controllers;

use App\Models\CaseDetail;
use App\Models\CaseEvidence;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use ZipArchive;

class ReporterController extends Controller
{
   
   

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {


        $validated = $request->validate([   
            // step 1
            'isAnonymous' => 'required|boolean',
            
            // step 2. 
            // INFORMANT (required only if NOT anonymous)
            'informantName' => 'required_if:isAnonymous,false|nullable|string|max:255',
            'informantTitle' => 'required_if:isAnonymous,false|nullable|string|max:50',
            'informantSex' => 'required_if:isAnonymous,false|nullable|in:male,female,prefer_not_to_say',
            'informantAge' => 'required_if:isAnonymous,false|nullable|integer|min:1|max:150',
            'informantPhone' => 'required_if:isAnonymous,false|nullable|string|max:20',
            'informantWorkplace' => 'required_if:isAnonymous,false|nullable|string',
            
            // step 3. 
            // VICTIM (always required)
            'victimName' => 'required|string|max:255',
            'victimTitle' => 'required|string|max:50',
            'victimSex' => 'required|in:male,female,prefer_not_to_say',
            'victimAge' => 'required|integer|min:1|max:150',
            'victimPhone' => 'required|string|max:20',
            'victimEmail' => 'required|email|max:255',
            'victimEducation' => 'required|string|max:255',
            'victimResidence' => 'required|string|max:255',
            'victimDisability' => 'nullable|string|max:255',
            'victimWorkplace' => 'required|string',
            
            // step 4. 
            // ACCUSED (always required)
            'accusedName' => 'required|string|max:255',
            'accusedTitle' => 'required|string|max:50',
            'accusedSex' => 'required|in:male,female,prefer_not_to_say',
            'accusedAge' => 'required|integer|min:1|max:150',
            // 'accusedPhone' => 'required|string|max:20',
            'accusedPhone' => 'required|string',
            'accusedEmail' => 'required|email|max:255',
            'accusedEducation' => 'required|string|max:255',
            'accusedResidence' => 'required|string|max:255',
            'accusedWorkplace' => 'required|string',
            
            // step 5. 
            // INCIDENT (always required)
            'incidentDate' => 'required|date|before_or_equal:today',
            'incidentTime' => 'required|string',
            'incidentLocation' => 'required|string|max:255',
            'incidentExactLocation' => 'required|string',
            'incidentType' => 'required|string', 
            'incidentCause' => 'required|string',
            'incidentDescription' => 'required|string',
            'incidentActions' => 'required|string',
            'incidentInjuries' => 'required|string',
            'incidentAssistance' => 'required|string',
            'incidentInvolved' => 'required|string',

            // step 6. 
            // 'evidenceFiles' => 'required|array|min:1',
            'evidenceFiles' => 'array',
            'evidenceFiles.*' => 'file|mimes:jpg,jpeg,png,pdf|max:10240', 
            'evidenceDescription' => 'required|string',  
            'confirmationChecked' => 'required|accepted', 

        ]); 
       


        try{

             // Start database transaction
            DB::beginTransaction();


            // 1. Create the main report 
            $case = CaseDetail::create([
                'is_anonymous' => $validated['isAnonymous'],
                'evidence_description' => $validated['evidenceDescription']
            ]);


              // 2. Create informant (only if NOT anonymous)
            if (!$validated['isAnonymous']) {
                $case->informantDetail()->create([
                    'name' => $validated['informantName'],
                    'title' => $validated['informantTitle'],
                    'sex' => $validated['informantSex'],
                    'age' => $validated['informantAge'],
                    'phone' => $validated['informantPhone'],
                    'workplace' => $validated['informantWorkplace'],
                ]);
            }

            // 3. Create victim
            $case->victimDetail()->create([
                'name' => $validated['victimName'],
                'title' => $validated['victimTitle'],
                'sex' => $validated['victimSex'],
                'age' => $validated['victimAge'],
                'phone' => $validated['victimPhone'],
                'email' => $validated['victimEmail'],
                'education' => $validated['victimEducation'],
                'residence' => $validated['victimResidence'],
                'disability' => $validated['victimDisability'],
                'workplace' => $validated['victimWorkplace'],
            ]);

             // 4. Create accused
            $case->accusedDetail()->create([
                'name' => $validated['accusedName'],
                'title' => $validated['accusedTitle'],
                'sex' => $validated['accusedSex'],
                'age' => $validated['accusedAge'],
                'phone' => $validated['accusedPhone'],
                'email' => $validated['accusedEmail'],
                'education' => $validated['accusedEducation'],
                'residence' => $validated['accusedResidence'],
                'workplace' => $validated['accusedWorkplace'],
            ]);

            // 5. Create incident
            $case->incidentDetail()->create([
                'incident_date' => $validated['incidentDate'],
                'incident_time' => $validated['incidentTime'],
                'location' => $validated['incidentLocation'],
                'exact_location' => $validated['incidentExactLocation'],
                'incident_type' => $validated['incidentType'], 
                'cause' => $validated['incidentCause'],
                'description' => $validated['incidentDescription'],
                'actions_taken' => $validated['incidentActions'],
                'injuries' => $validated['incidentInjuries'],
                'assistance_needed' => $validated['incidentAssistance'],
                'other_involved' => $validated['incidentInvolved'],
            ]);

            // 6. Evidence Files and description
            if($request->hasFile('evidenceFiles')){
                foreach($request->file('evidenceFiles') as $file){
                   $path = Storage::disk('local')->put('evidence_files', $file); 

                   $case->caseEvidence()->create([
                      'file_path' => $path,
                      'file_name' => $file->getClientOriginalName(),
                      'file_type' => $file->getClientMimeType(),  
                   ]);
                }

            }
            


            DB::commit(); 

            Inertia::flash('case_tracking_id', $case->case_tracking_id); 
            $request->session()->put('case_tracking_id', $case->case_tracking_id); 

            return redirect()->route('case-reported-successfully'); 


        }catch(Exception $e){

            DB::rollBack();

            Log::error('Report submission failed', [
                'transaction' => 'report submission failed',
                'ip_address' => $request->ip(),
                'route' => $request->route()?->getName(),
                'url'=> $request->fullUrl(),
                'method' => $request->method(),
                "session_id" => $request->session()->getId(),
                'error' => $e->getMessage(),
            ]);						
            return back()->withErrors([
                   'error' => "Failed to submit report. Please try again or contact support."
            ]); 

        }
    }
    
    
    // post request
    public function trackCase(Request $request) : RedirectResponse
    {
        $validated = $request->validate([
             'tracking_id' => ['required','string',  'regex:/^PS-\d{4}-\d{2}-\d{2}-[A-Z0-9]{5}$/'],
        ], [
            'tracking_id.regex' => 'Invalid Tracking ID.',
        ]);

        $trackingIdExists = CaseDetail::where('case_tracking_id', $validated['tracking_id'])->exists(); 

        if(!$trackingIdExists){
            return back()->withErrors([
                'tracking_id' => 'We could not find a case with that tracking ID. Please check and try again.'
            ]);
        }
          
        $request->session()->put('case_tracking_id', $validated['tracking_id']); 
        $request->session()->put('case_session_expires_at', now()->addMinutes(5)->timestamp);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Session created Successfully. ')]);


        return redirect()->route('track.show-case'); 

    }   
    
    // get request
    public function showCase(Request $request)
    {
           

           // The track.case.session middleware handles the check if the session case_tracking_id is valid
           // So no need to define that here.    

           $case_tracking_id =  $request->session()->get('case_tracking_id'); 

           $case = CaseDetail::where('case_tracking_id', $case_tracking_id)
            ->with([
                'informantDetail',
                'victimDetail',
                'accusedDetail',
                'incidentDetail',
                'caseEvidence',
                'caseAssignment.assignedTo:id,first_name,last_name,role',
                'caseWorkflow.completedBy:id,first_name,last_name,role',
               
            ])
            ->first();

     

      

        $formattedCase =  [  
            'uuid' => $case->uuid, 
            'case_tracking_id' => $case->case_tracking_id, 
            'status' => $case->status, 
            'is_anonymous'=> $case->is_anonymous, 
            'evidence_description' => $case->evidence_description, 
            'created_at' => $case->created_at->toIso8601String(), 

            // we check informant_detail first if it is present , since the reporter could be anonymous meaning null
            'informant_detail' => $case->informantDetail ? [
                'name'      => $case->informantDetail->name,
                'title'     => $case->informantDetail->title,
                'sex'       => $case->informantDetail->sex,
                'age'       => $case->informantDetail->age,
                'phone'     => $case->informantDetail->phone,
                'workplace' => $case->informantDetail->workplace,
            ] : null,

            'victim_detail' => [
                'name'        => $case->victimDetail->name,
                'title'       => $case->victimDetail->title,
                'sex'         => $case->victimDetail->sex,
                'age'         => $case->victimDetail->age,
                'phone'       => $case->victimDetail->phone,
                'email'       => $case->victimDetail->email,
                'education'   => $case->victimDetail->education,
                'residence'   => $case->victimDetail->residence,
                'disability'  => $case->victimDetail->disability,
                'workplace'   => $case->victimDetail->workplace,
            ], 
            'accused_detail' => [
                'name'      => $case->accusedDetail->name,
                'title'     => $case->accusedDetail->title,
                'sex'       => $case->accusedDetail->sex,
                'age'       => $case->accusedDetail->age,
                'phone'     => $case->accusedDetail->phone,
                'email'     => $case->accusedDetail->email,
                'education' => $case->accusedDetail->education,
                'residence' => $case->accusedDetail->residence,
                'workplace' => $case->accusedDetail->workplace,
            ], 
            'incident_detail' => [
                'incident_date'     => $case->incidentDetail->incident_date,
                'incident_time'     => $case->incidentDetail->incident_time,
                'location'          => $case->incidentDetail->location,
                'exact_location'    => $case->incidentDetail->exact_location,
                'incident_type'     => $case->incidentDetail->incident_type,
                'cause'             => $case->incidentDetail->cause,
                'description'       => $case->incidentDetail->description,
                'actions_taken'     => $case->incidentDetail->actions_taken,
                'injuries'          => $case->incidentDetail->injuries,
                'assistance_needed' => $case->incidentDetail->assistance_needed,
                'other_involved'    => $case->incidentDetail->other_involved,
            ], 
            'case_evidence' => $case->caseEvidence->map(fn($evidence) => [  
                'uuid' => $evidence->uuid, 
                'file_name'  => $evidence->file_name,
                'file_type'  => $evidence->file_type,
                // 'file_path'  => Storage::disk('public')->url($evidence->file_path), 
                // 'file_path'  => Storage::temporaryUrl(
                //         $evidence->file_path,
                //         now()->addMinutes(5) // expires in 1 minute
                //     ),   
                'created_at' => $evidence->created_at->toIso8601String(),
            ]),
            'case_assignment' => $case->caseAssignment ? [
                'assigned_to' => [
                    'first_name' => $case->caseAssignment->assignedTo->first_name,
                    'last_name'  => $case->caseAssignment->assignedTo->last_name,
                    'role'       => $case->caseAssignment->assignedTo->role,
                ], 
                'priority'    => $case->caseAssignment->priority,
                'created_at'  => $case->caseAssignment->created_at->toIso8601String(),
            ] : null, 
            'case_workflow' => $case->caseWorkflow->map(fn($workflow) => [
                'phase'        => $workflow->phase,
                'completed_at' => $workflow->completed_at ? $workflow->completed_at->toIso8601String() : null,
                'completed_by' => [
                    'first_name' => $workflow->completedBy->first_name,
                    'last_name'  => $workflow->completedBy->last_name,
                    'role'       => $workflow->completedBy->role,
                ],
            ]),
        ]; 

        // Calculate progress based on workflow phases
        $workflow_phases = ['intake', 'investigation', 'escalation', 'resolution'];
        $completed_phases = $case->caseWorkflow->pluck('phase')->toArray();
        
        $progress = [
            'percentage' => $case->case_workflow_percentage,
            'completed_phases' => $completed_phases,
            'all_phases' => $workflow_phases,
            'current_status' => $case->status,
        ];


        
        return Inertia::render('reporter/track', [
            'case' => $formattedCase,
            'progress' => $progress,
        ]); 
    }
    

    public function destroyTrackCaseSession(Request $request): RedirectResponse
    {
        $request->session()->forget(['case_tracking_id', 'case_session_expires_at']);  
        Inertia::flash('toast', ['type' => 'success', 'message' => __('Session Destroyed Successfully.')]);

        return redirect()->route('home');
    }


    // viewing the file using Storage::response
    // public function viewFile(Request $request, CaseEvidence $file)
    // {
    //     // dd(Storage::disk('local')->exists($file->file_path));

    //     // return Storage::download($file->file_path, $file->file_name);
    //     return Storage::response(
    //         $file->file_path,
    //         $file->file_name,
    //         ['Content-Disposition' => 'inline']
    //     );
    // }

    //download File(s)
    public function downloadFile(CaseEvidence $file)
    {
         return Storage::download($file->file_path, $file->file_name);   
    }

   

   
}
