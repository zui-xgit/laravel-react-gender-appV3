<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CaseWorkflowData extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    /**
     * DATA TRANSFORMATION (The Translator)
     * 
     * This tells Laravel how to convert database columns into PHP types.
     * For example: 'is_active' (0 or 1 in DB) becomes (true or false in PHP).
     */
    protected $casts = [
        'form_data' => 'array',
        // 'completed_at' => 'datetime',
    ];

    public function caseDetail(): BelongsTo
    {
        return $this->belongsTo(CaseDetail::class);
    }

    public function completedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'completed_by');
    }
}
