<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CaseEvidence extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function caseDetail(): BelongsTo
    {
        return $this->belongsTo(CaseDetail::class);
    }

    public function uploadedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
