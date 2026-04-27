<?php

namespace App\Models;

use App\Models\CaseDetail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class IncidentDetail extends Model
{
    /** @use HasFactory<\Database\Factories\IncidentDetailFactory> */
    use HasFactory;

    protected $guarded = ["id", "created_at", "updated_at"];

    public function caseDetail(): BelongsTo
    {
        return $this->belongsTo(CaseDetail::class); 
    }
}
