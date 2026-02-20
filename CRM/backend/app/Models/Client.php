<?php

namespace App\Models;

use App\Traits\IsDeletedFlag;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use IsDeletedFlag;

    protected $fillable = [
        'name',
        'email',
        'mobile',
        'company_name',
        'company_address',
        'status',
        'stage',
        'assigned_to_id',
        'created_by_id',
        'is_archived',
        'is_deleted',
    ];

    protected $casts = [
        'is_archived' => 'boolean',
        'is_deleted' => 'boolean',
    ];

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }

    public function followUps()
    {
        return $this->hasMany(FollowUp::class);
    }

    public function billingItems()
    {
        return $this->hasMany(BillingItem::class);
    }

    public function paymentsReceived()
    {
        return $this->hasMany(PaymentReceived::class);
    }
}