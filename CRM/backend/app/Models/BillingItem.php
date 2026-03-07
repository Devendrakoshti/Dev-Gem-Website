<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Traits\LogsActivity;

class BillingItem extends Model
{
    use HasFactory, LogsActivity;

    protected $fillable = [
        'client_id',
        'service_name',
        'amount_to_collect',
        'paid_amount',
        'remaining_amount',
        'status',
        'billing_date',
        'due_date',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
