<?php

namespace App\Models;

use App\Models\AccusedDetail;
use App\Models\CaseActivity;
use App\Models\CaseAssignment;
use App\Models\CaseEvidence;
use App\Models\CaseWorkflowData;
use App\Models\IncidentDetail;
use App\Models\InformantDetail;
use App\Models\VictimDetail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CaseDetail extends Model
{
    /** @use HasFactory<\Database\Factories\CaseDetailFactory> */
    use HasFactory, HasUuids;

    protected $guarded = ["id", "uuid", "created_at", 'updated_at'];

    /**
     * Get the columns that should receive a unique identifier.
     *
     * @return array<int, string>
     */
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

    // ========================RELATIONSHIP TO WORKFLOW TABLES ======================
    public function caseActivities(): HasMany
    {
        return $this->hasMany(CaseActivity::class);
    }

    public function caseEvidences(): HasMany
    {
        return $this->hasMany(CaseEvidence::class);
    }

    public function caseWorkflowData(): HasMany
    {
        return $this->hasMany(CaseWorkflowData::class);
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
