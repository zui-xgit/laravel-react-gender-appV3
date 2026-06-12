<?php

namespace App\Models;

use App\Models\AccusedDetail;
use App\Models\CaseAssignment;
use App\Models\CaseEvidence;
use App\Models\CaseWorkflow;
use App\Models\IncidentDetail;
use App\Models\InformantDetail;
use App\Models\VictimDetail;
use App\Observers\CaseDetailObserver;
use Illuminate\Console\Attributes\Hidden;
use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;


#[Guarded(["id", "uuid", "created_at", 'updated_at'])]
#[ObservedBy([CaseDetailObserver::class])]
class CaseDetail extends Model
{
    /** @use HasFactory<\Database\Factories\CaseDetailFactory> */
    use HasFactory, HasUuids;


    // accessors
    protected function caseWorkflowPercentage(): Attribute
    {
      return Attribute::make(
         get: function (){
            $workflow_phases = ['intake', 'investigation', 'escalation', 'resolution']; 
            $completedPhaseCount = $this->caseWorkflow()->whereIn('phase', $workflow_phases)->count(); 
            $totalPhases = count($workflow_phases);
            return  ($completedPhaseCount / $totalPhases) * 100;
         },
      ); 
    }

    /**
     * Get the columns that should receive a unique identifier.
     *
     * @return array<int, string>
     */
    public function uniqueIds(): array
    {
        return ['uuid'];
    }


    public function casts(): array
    {
        return [
            'evidence_description' => 'encrypted',
        ];
    }


    /**
     * The "booted" method of the model. I USED OBERSVERS INSTEAD
     * to generate the unique tracking ID, so this is commented out.
     */
    // protected static function booted(): void
    // {
    //     static::creating(function (CaseDetail $caseDetail) {
    //         do {
    //             $datePart = now()->format('Y-m-d');
    //             $randomPart = strtoupper(Str::random(5));
    //             $trackingId = "PS-{$datePart}-{$randomPart}";
    //         } while (static::where('case_tracking_id', $trackingId)->exists());

    //         // Assign the unique tracking ID seamlessly
    //         $caseDetail->case_tracking_id = $trackingId;
    //     });
    // }

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
   
    public function caseEvidence(): HasMany
    {
        return $this->hasMany(CaseEvidence::class);
    }

    public function caseWorkflow(): HasMany
    {
        return $this->hasMany(CaseWorkflow::class);
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
