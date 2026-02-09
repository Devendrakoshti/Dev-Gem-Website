<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasUlids, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'employee_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    
    // Scopes
    public function scopeActive($query)
    {
        return $query->whereNull('deleted_at'); // SoftDeletes handles this automatically mostly
    }

    public function scopeEmployees($query)
    {
        return $query->where('role', 'EMPLOYEE');
    }

    public function scopeAdmins($query)
    {
        return $query->where('role', 'ADMIN');
    }
    
    // Relationships
    public function clients()
    {
        // Clients assigned to this user
        return $this->hasMany(Client::class, 'assigned_to_id');
    }
    
    public function createdClients()
    {
        return $this->hasMany(Client::class, 'created_by_employee_id');
    }

    public function followUps()
    {
        return $this->hasMany(FollowUp::class, 'employee_id');
    }

    public function notes()
    {
        return $this->hasMany(Note::class, 'employee_id');
    }

    public function activityLogs()
    {
        return $this->hasMany(ActivityLog::class, 'actor_id');
    }
}
