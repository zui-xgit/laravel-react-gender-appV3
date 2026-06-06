<?php

namespace App\Models;

use App\Models\CaseDetail;
use App\Observers\CaseWorkflowObserver;
use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


#[Guarded(['id', 'created_at', 'updated_at'])]
#[ObservedBy([CaseWorkflowObserver::class])]
class CaseWorkflow extends Model
{

   

    public function casts(): array 
    {
        return [
            'form_data' => 'array',
        ];
    }

    public function caseDetail(): BelongsTo
    {
        return $this->belongsTo(CaseDetail::class);
    }

    public function completedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'completed_by');
    }
   
}
