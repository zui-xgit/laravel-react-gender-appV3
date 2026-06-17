<?php

namespace App\Http\Controllers;

use App\Models\CaseDetail;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CaseWorkflowController extends Controller
{
    //

    public function caseWorkFlow(Request $request, CaseDetail $case)
    {
        $intake_data = $case->caseWorkflow()->where("phase", 'intake')->value('form_data');
        $investigation_data = $case->caseWorkflow()->where("phase", 'investigation')->value('form_data');
        $escalation_data = $case->caseWorkflow()->where("phase", 'escalation')->value('form_data');
        $resolution_data = $case->caseWorkflow()->where("phase", 'resolution')->value('form_data');

         $case_evidence = $case->caseEvidence->map(function ($evidence) {
                return [
                    'uuid' => $evidence->uuid, 
                    'file_name' => $evidence->file_name,
                    'file_type' => $evidence->file_type,
                  //   'file_path' => asset('storage/' . $evidence->file_path),
                    'created_at' => $evidence->created_at->toIso8601String(),
                ];
         });

       return Inertia::render('dashboard/case-workflow', [
            'case_uuid' => $case->uuid,
            'case_tracking_id' => $case->case_tracking_id,
            'from_page' => $request->query('from_page'), 
            'from_url' => $request->query("from_url"), 

            // Tabs data (if or if not available is handled in the frontend); 
            'intake' => [
                'intake_data' => $intake_data, 
                'case_evidence' => $case_evidence
            ], 
            'investigation_data' => $investigation_data,    
            "escalation_data" => $escalation_data, 
            "resolution_data" => $resolution_data,
            "caseWorkflowPercentage" => $case->caseWorkflowPercentage
            
       ]); 
    }
    public function caseIntake(Request $request, CaseDetail $case) 
    {

       $validated = $request->validate([
        'checklist.identity' => 'required|boolean',
        'checklist.jurisdiction' => 'required|boolean',
        'checklist.safety' => 'required|boolean',
        'observations' => 'required|string',
       ]); 


       try{
          DB::beginTransaction(); 

          $case->caseWorkflow()->updateOrCreate(
              ["phase" => 'intake'],
              [
                'form_data' => $validated, 
                "completed_by" => Auth::id(), 
                'completed_at' => now() 
              ]

          );

          activity('intake-workflow')
          ->causedBy(Auth::user())
          ->event('workflow')
          ->withProperties([
             'ip' => $request->ip(), 
             'userAgent' => $request->userAgent(), 
          ])
          ->log('Intake workflow submitted'); 

          DB::commit(); 
          Inertia::flash('toast', ['type' => 'success', 'message' => __('Intake verified and locked successfully.')]);

            

       }catch(Exception $e){
          DB::rollBack(); 

          dd($e);

          return back()->withErrors([
            'error' => 'An internal error occurred while processing the intake.'
        ]);
       }


    }
    public function caseInvestigate(Request $request, CaseDetail $case) 
    {
         $validated = $request->validate([
             "subjectName" => 'required|string',
             "relationship" => "required|string",
             "summary" => "required|string"
         ]);

         try{
            DB::beginTransaction(); 


            $case->caseWorkflow()->updateOrCreate(
              ["phase" => 'investigation'],
              [
                'form_data' => $validated, 
                "completed_by" => Auth::id(), 
                'completed_at' => now() 
              ]

          );

          activity('investigate-workflow')
          ->causedBy(Auth::user())
          ->event('workflow')
          ->withProperties([
             'ip' => $request->ip(), 
             'userAgent' => $request->userAgent(), 
          ])
          ->log('Investigate workflow submitted'); 

          DB::commit(); 
          Inertia::flash('toast', ['type' => 'success', 'message' => __('Investigation verified and locked successfully.')]);

         }catch(Exception $e){
            DB::rollBack(); 

            return back()->withErrors([
               'error' => 'An internal error occurred while processing the intake.'
            ]);
         }
        
    }
    public function caseEscalate(Request $request, CaseDetail $case) 
    {
        $validated = $request->validate([
            "targetUnit" => "required|string",
            "reason" =>  "required|string",
            "notes" =>  "required|string",
        ]);

        try{
            DB::beginTransaction(); 


            $case->caseWorkflow()->updateOrCreate(
              ["phase" => 'escalation'],
              [
                'form_data' => $validated, 
                "completed_by" => Auth::id(), 
                'completed_at' => now() 
              ]

          );

          activity('escalate-workflow')
          ->causedBy(Auth::user())
          ->event('workflow')
          ->withProperties([
             'ip' => $request->ip(), 
             'userAgent' => $request->userAgent(), 
          ])
          ->log('Escalate workflow submitted'); 

          DB::commit(); 
          Inertia::flash('toast', ['type' => 'success', 'message' => __('Escalation verified and locked successfully.')]);

         }catch(Exception $e){
            DB::rollBack(); 

            return back()->withErrors([
               'error' => 'An internal error occurred while processing the intake.'
            ]);
         }


    }
    public function caseResolve(Request $request, CaseDetail $case) 
    {
        $validated = $request->validate([
            "coordinatorName" => 'required',
            "phone" => 'required',
            "comment" => 'required',
            "date" => 'required',
            "time" => 'required',
        ]);

        
        try{
            DB::beginTransaction(); 


            $case->caseWorkflow()->updateOrCreate(
              ["phase" => 'resolution'],
              [
                'form_data' => $validated, 
                "completed_by" => Auth::id(), 
                'completed_at' => now() 
              ]

          );

          activity('resolve-workflow')
          ->causedBy(Auth::user())
          ->event('workflow')
          ->withProperties([
             'ip' => $request->ip(), 
             'userAgent' => $request->userAgent(), 
          ])
          ->log('Resolve workflow submitted'); 

          DB::commit(); 
          Inertia::flash('toast', ['type' => 'success', 'message' => __('Resolution verified and locked successfully.')]);

         }catch(Exception $e){
            DB::rollBack(); 

            return back()->withErrors([
               'error' => 'An internal error occurred while processing the intake.'
            ]);
         }
    }
}
