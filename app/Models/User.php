<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Concerns\HasUuids; 
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\Activitylog\Models\Concerns\LogsActivity;
use Spatie\Activitylog\Support\LogOptions;
use Spatie\Activitylog\Contracts\Activity;
use Spatie\Permission\Traits\HasRoles;


#[Guarded(['id', 'uuid', 'created_at', "updated_at"])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable
{


    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasUuids, TwoFactorAuthenticatable, LogsActivity;
    use HasRoles; // From spatie/laravel-permission 

   

    const STATUS_ACTIVE = 'active';
    const STATUS_INACTIVE = 'inactive';
    const STATUS_SUSPENDED = 'suspended';



    public function beforeActivityLogged(Activity $activity, string $eventName)
    {
        $activity->properties = $activity->properties->merge([
            'ip' => request()->ip(),
            'userAgent' => request()->userAgent()
        ]); 
    }   

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
        ->logOnly(['username', 'first_name', 'last_name', 'gender', 'email', 'phone', 'status'])
        ->logOnlyDirty()
        ->dontLogEmptyChanges()
        ->useLogName("users-table") 
        ->setDescriptionForEvent(function (string $eventName) {
            return match($eventName){
                'created' => "user created",
                'updated' => "user updated",
                'deleted' => "user deleted",
                default   => "Account profile event: {$eventName}"
            };
        })
        ;
    }

   

  
     /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            /* @chisel-2fa */
            'two_factor_confirmed_at' => 'datetime',
            'last_login_at' => 'datetime',
            'last_logout_at' => 'datetime',
            /* @end-chisel-2fa */
        ];
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


    //==================== RELATIONSHIP TO THE CASE ASSIGNMENT MODEL ==================== 
    public function casesAssignedToMe() // Or 'tasks'
    {
        return $this->hasMany(CaseAssignment::class, 'assigned_to');
    }

    public function casesIHaveAssigned() 
    {
        return $this->hasMany(CaseAssignment::class, 'assigned_by');
    }


  

     public static function getStatuses(): array
    {
        return [
            self::STATUS_ACTIVE => 'Active',
            self::STATUS_INACTIVE => 'Inactive',
            self::STATUS_SUSPENDED => 'Suspended',
        ];
    }


  

    // ==================== STATUS CHECKING METHODS ====================

    public function isActive(): bool
    {
        return $this->status === self::STATUS_ACTIVE;
    }

    public function isInactive(): bool
    {
        return $this->status === self::STATUS_INACTIVE;
    }

    public function isSuspended(): bool
    {
        return $this->status === self::STATUS_SUSPENDED;
    }


    public function activate(): bool
    {
        return $this->update(['status' => self::STATUS_ACTIVE]);
    }

    public function deactivate(): bool
    {
        return $this->update(['status' => self::STATUS_INACTIVE]);
    }

    public function suspend(): bool
    {
        return $this->update(['status' => self::STATUS_SUSPENDED]);
    }

        // ==================== QUERY SCOPES ====================

   

    public function scopeActive($query)
    {
        return $query->where('status', self::STATUS_ACTIVE);
    }

    public function scopeInactive($query)
    {
        return $query->where('status', self::STATUS_INACTIVE);
    }

    public function scopeSuspended($query)
    {
        return $query->where('status', self::STATUS_SUSPENDED);
    }

}
