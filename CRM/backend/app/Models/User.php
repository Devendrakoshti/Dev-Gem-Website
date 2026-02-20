<?php

namespace App\Models;

use App\Traits\IsDeletedFlag;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, IsDeletedFlag;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'employee_id',
        'password',
        'role',
        'status',
        'is_deleted',
    ];

    protected $hidden = [
        'password',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'is_deleted' => 'boolean',
        ];
    }

    public function clients()
    {
        return $this->hasMany(Client::class, 'assigned_to_id');
    }

    public function isAdmin(): bool
    {
        return $this->role === 'ADMIN';
    }
}