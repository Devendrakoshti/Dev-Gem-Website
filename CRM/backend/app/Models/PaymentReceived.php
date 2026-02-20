<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentReceived extends Model
{
    protected $table = 'payments_received';

    protected $fillable = [
        'client_id',
        'amount_received',
        'received_date',
        'payment_mode',
        'notes',
    ];

    protected $casts = [
        'amount_received' => 'decimal:2',
        'received_date' => 'date',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}