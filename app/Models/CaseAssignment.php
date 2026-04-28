<?php

namespace App\Models;

use App\Models\CaseDetail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CaseAssignment extends Model
{
    /** @use HasFactory<\Database\Factories\CaseAssignmentFactory> */
    use HasFactory, HasUuids;

    protected $guarded = ['id', 'uuid' ,'created_at', 'updated_at'];

    /**
     * Get the columns that should receive a unique identifier.
     *
     * @return array<int, string>
     */
    public function uniqueIds(): array
    {
        return ['uuid'];
    }

    //==================== RELATIONSHIP TO THE USER MODEL ==================== 

    public function assignedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_by');
    }

    public function assignedTo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    //============================RELATIONSHIP TOT HE case_details TABLE ===================
    public function caseDetail(): BelongsTo
    {
        return $this->belongsTo(CaseDetail::class);
    } 
}
