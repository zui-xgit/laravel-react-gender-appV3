<?php

namespace App\Models;

use App\Models\CaseDetail;
use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


#[Guarded(['id', 'created_at', 'updated_at'])]
class IncidentDetail extends Model
{
    /** @use HasFactory<\Database\Factories\IncidentDetailFactory> */
    use HasFactory;


    public function casts(): array
    {
        return [
            'location' => 'encrypted',
            'exact_location' => 'encrypted',
            'cause' => 'encrypted',
            'description' => 'encrypted',
            'actions_taken' => 'encrypted',
            'injuries' => 'encrypted',
            'assistance_needed' => 'encrypted',
            'other_involved' => 'encrypted',
        ];
    }

    public function caseDetail(): BelongsTo
    {
        return $this->belongsTo(CaseDetail::class); 
    }
}
