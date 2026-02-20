<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BillingItem extends Model
{
    protected $fillable = [
        'client_id',
        'service_name',
        'description',
        'amount_to_collect',
        'billing_date',
        'status',
    ];

    protected $casts = [
        'amount_to_collect' => 'decimal:2',
        'billing_date' => 'date',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}