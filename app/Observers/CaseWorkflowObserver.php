<?php

namespace App\Observers;

use App\Models\CaseWorkflow;

class CaseWorkflowObserver
{
    /**
     * Handle the CaseWorkflow "created" event.
     */
    public function created(CaseWorkflow $caseWorkflow): void
    {
        //
    }

    public function saved(CaseWorkflow $caseWorkflow): void
    {   
         $case = $caseWorkflow->caseDetail; 
         if($case->case_workflow_percentage === 100){
              $case->update([
                 'status' => 'completed'
              ]);
         }
        //  TODO: i should remove this , not ideal for production
         else{
             $case->update([
                 'status' => 'in_progress'
              ]);
         }
    }

    /**
     * Handle the CaseWorkflow "updated" event.
     */
    public function updated(CaseWorkflow $caseWorkflow): void
    {
        //
    }

    /**
     * Handle the CaseWorkflow "deleted" event.
     */
    public function deleted(CaseWorkflow $caseWorkflow): void
    {
        //
    }

    /**
     * Handle the CaseWorkflow "restored" event.
     */
    public function restored(CaseWorkflow $caseWorkflow): void
    {
        //
    }

    /**
     * Handle the CaseWorkflow "force deleted" event.
     */
    public function forceDeleted(CaseWorkflow $caseWorkflow): void
    {
        //
    }
}
