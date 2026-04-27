<?php

namespace App\Models;

use App\Models\AccusedDetail;
use App\Models\CaseAssignment;
use App\Models\IncidentDetail;
use App\Models\InformantDetail;
use App\Models\VictimDetail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CaseDetail extends Model
{
    /** @use HasFactory<\Database\Factories\CaseDetailFactory> */
    use HasFactory;

    protected $guarded = ["id", "created_at", 'updated_at'];

    public function uniqueIds(): array
    {
        return ['uuid'];
    }


    // ===================RELATIONSHIP TO THE informant_details, victim_details, accudes_details, incident_details tables =============================
    public function informantDetail(): HasOne
    {
        return $this->hasOne(InformantDetail::class);
    }

    public function victimDetail(): HasOne
    {
        return $this->hasOne(VictimDetail::class);
    }

    public function accusedDetail(): HasOne
    {
        return $this->hasOne(AccusedDetail::class);
    }

    public function incidentDetail(): HasOne
    {
        return $this->hasOne(IncidentDetail::class);
    }

    // ========================RELATIONSHIP TO case_assignments TABLE ===============
    public function caseAssignment(): HasOne
    {
          return $this->hasOne(CaseAssignment::class); 
    }



    // TODO: need to understand these functions more
     /**
     * Scopes - for easy filtering
     */
    public function scopeAnonymous($query)
    {
        return $query->where('is_anonymous', true);
    }

    public function scopeIdentified($query)
    {
        return $query->where('is_anonymous', false);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }
}
