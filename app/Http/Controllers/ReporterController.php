<?php

namespace App\Http\Controllers;

use App\Models\CaseDetail;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ReporterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */

     public function store(Request $request)
    {

         

        //
         $validated = $request->validate([
            'isAnonymous' => 'required|boolean',
            
            // INFORMANT (required only if NOT anonymous)
            'informantName' => 'required_if:isAnonymous,false|nullable|string|max:255',
            'informantTitle' => 'required_if:isAnonymous,false|nullable|string|max:50',
            'informantSex' => 'required_if:isAnonymous,false|nullable|in:male,female,prefer_not_to_say',
            'informantAge' => 'required_if:isAnonymous,false|nullable|integer|min:1|max:150',
            'informantPhone' => 'required_if:isAnonymous,false|nullable|string|max:20',
            'informantWorkplace' => 'required_if:isAnonymous,false|nullable|string',
            
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
            
            // INCIDENT (always required)
            'incidentDate' => 'required|date|before_or_equal:today',
            'incidentTime' => 'required|string',
            'incidentLocation' => 'required|string|max:255',
            'incidentExactLocation' => 'required|string',
            'incidentType' => 'required|string', 
            'incidentCause' => 'required|string',
            // 'incidentDescription' => 'required|string|min:20',
            'incidentDescription' => 'required|string',
            'incidentActions' => 'required|string',
            'incidentInjuries' => 'required|string',
            'incidentAssistance' => 'required|string',
            'incidentInvolved' => 'required|string',
        ]);


        
        
        try{

						 
            $datePart = now()->format('Y-m-d'); // 2025-12-26
            $randomPart = strtoupper(Str::random(5)); // e.g., EG34X
            $case_tracking_id = "PS-{$datePart}-{$randomPart}";


             // Start database transaction

            DB::beginTransaction();


            // 1. Create the main report 
            $case = CaseDetail::create([
                'case_tracking_id' => $case_tracking_id, 
                'is_anonymous' => $validated['isAnonymous'],
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


            DB::commit(); 

            // create the log for creating the submition
            Log::info("Case created successfully", [
                 'reference_number' => $case->case_tracking_id
            ]); 

            Inertia::flash("case_report_id", $case->case_tracking_id); 


        }catch(Exception $e){

            DB::rollBack();

        //    dd($e);

            Log::error('Report submission failed', [
                'transaction' => 'report submission failed',
                'ip_address' => $request->ip(),
                'route' => request()->route()?->getName(),
                'url'=> request()->fullUrl(),
                'method' => request()->method(),
                "session_id" => $request->session()->getId(),
                'error' => $e->getMessage(),
                // 'trace' => $e->getTraceAsString(), dont include this because : Short answer: because it’s redundant, risky, and inefficient in Laravel. Laravel (via Monolog) automatically records:
            ]);

						
           
            
            return back()->withErrors([
                   'error' => "Failed to submit report. Please try again or contact support."
            ]); 

            
        }
    }

    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
