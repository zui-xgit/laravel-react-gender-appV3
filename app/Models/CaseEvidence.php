<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Concerns\HasUuids;


#[Guarded(['id', 'created_at', 'updated_at'])]
class CaseEvidence extends Model
{

    use HasUuids; 

    /**
     * Get the columns that should receive a unique identifier.
     *
     * @return array<int, string>
    */
    public function uniqueIds(): array
    {
        return ['uuid'];
    }



    public function caseDetail(): BelongsTo
    {
        return $this->belongsTo(CaseDetail::class);
    }

    
}
