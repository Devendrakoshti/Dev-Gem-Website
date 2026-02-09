<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use HasFactory, HasUlids, SoftDeletes;

    protected $fillable = [
        'name',
        'mobile',
        'company_name',
        'company_address',
        'email',
        'status',
        'stage',
        'assigned_to_id',
        'assigned_to_name',
        'created_by_employee_id',
        'is_archived',
        // is_deleted is handled by SoftDeletes trait column deleted_at
    ];

    protected $casts = [
        'is_archived' => 'boolean',
        // 'is_deleted' not needed in casts as we use SoftDeletes
    ];

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_archived', false);
    }

    public function scopeArchived($query)
    {
        return $query->where('is_archived', true);
    }
    
    // Relationships
    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_to_id');
    }

    public function createdByUser()
    {
        return $this->belongsTo(User::class, 'created_by_employee_id');
    }

    public function billingItems()
    {
        return $this->hasMany(BillingItem::class);
    }

    public function paymentsReceived()
    {
        return $this->hasMany(PaymentReceived::class);
    }

    public function followUps()
    {
        return $this->hasMany(FollowUp::class);
    }

    public function notes()
    {
        return $this->hasMany(Note::class);
    }
    

}
