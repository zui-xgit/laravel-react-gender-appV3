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

          DB::commit(); 
          Inertia::flash("message", 'Intake verified and locked successfully');
            

       }catch(Exception $e){
          DB::rollBack(); 

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

          DB::commit(); 
          Inertia::flash("message", 'Investigation verified and locked successfully');

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

          DB::commit(); 
          Inertia::flash("message", 'Escalation verified  successfully');

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

          DB::commit(); 
          Inertia::flash("message", 'Resolution verified  successfully');

         }catch(Exception $e){
            DB::rollBack(); 

            return back()->withErrors([
               'error' => 'An internal error occurred while processing the intake.'
            ]);
         }
    }
}
