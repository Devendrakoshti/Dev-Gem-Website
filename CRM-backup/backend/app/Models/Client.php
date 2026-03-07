<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

use App\Traits\LogsActivity;

class Client extends Model
{
    use HasFactory, SoftDeletes, LogsActivity;

    protected $fillable = [
        'name',
        'mobile',
        'company_name',
        'company_address',
        'email',
        'status',
        'stage',
        'assigned_to_id',
        'created_by_employee_id',
        'is_archived',
        'is_deleted',
    ];

    protected $casts = [
        'is_archived' => 'boolean',
        'is_deleted' => 'boolean',
    ];

    public function assignedTo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_employee_id');
    }

    public function billingItems(): HasMany
    {
        return $this->hasMany(BillingItem::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(PaymentReceived::class);
    }

    public function followUps(): HasMany
    {
        return $this->hasMany(FollowUp::class);
    }

    public function notes(): HasMany
    {
        return $this->hasMany(Note::class);
    }

    // Scopes
    public function scopeArchived($query)
    {
        return $query->where('is_archived', true);
    }

    public function scopeActive($query)
    {
        return $query->where('is_archived', false)->where('status', 'ACTIVE');
    }
}
