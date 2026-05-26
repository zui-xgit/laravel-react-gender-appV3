<?php

namespace App\Observers;

use App\Models\CaseDetail;
use Illuminate\Support\Str;

class CaseDetailObserver
{

   public function creating(CaseDetail $caseDetail): void
   {
      do {
            $datePart = now()->format('Y-m-d');
            $randomPart = strtoupper(Str::random(5));
            $trackingId = "PS-{$datePart}-{$randomPart}";
        } while (CaseDetail::where('case_tracking_id', $trackingId)->exists());

        // Assign the unique id seamlessly
        $caseDetail->case_tracking_id = $trackingId;
   }


    /**
     * Handle the CaseDetail "created" event.
     */
    public function created(CaseDetail $caseDetail): void
    {
        //
    }

    /**
     * Handle the CaseDetail "updated" event.
     */
    public function updated(CaseDetail $caseDetail): void
    {
        //
    }

    /**
     * Handle the CaseDetail "deleted" event.
     */
    public function deleted(CaseDetail $caseDetail): void
    {
        //
    }

    /**
     * Handle the CaseDetail "restored" event.
     */
    public function restored(CaseDetail $caseDetail): void
    {
        //
    }

    /**
     * Handle the CaseDetail "force deleted" event.
     */
    public function forceDeleted(CaseDetail $caseDetail): void
    {
        //
    }
}
