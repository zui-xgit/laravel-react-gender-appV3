<?php

namespace App\Models;

use App\Models\CaseDetail;
use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


#[Guarded(['id', 'created_at', 'updated_at'])]
class VictimDetail extends Model
{
    /** @use HasFactory<\Database\Factories\VictimDetailFactory> */
    use HasFactory;

    
    protected function casts(): array
    {
        return [
            
            
            // Encrypted fields
            'name' => 'encrypted',
            'title' => 'encrypted',
            'phone' => 'encrypted',
            'email' => 'encrypted',
            'education' => 'encrypted',
            'residence' => 'encrypted',
            'disability' => 'encrypted',
            'workplace' => 'encrypted',
        ];
    }

    public function caseDetail(): BelongsTo
    {
        return $this->belongsTo(CaseDetail::class); 
    }
}
