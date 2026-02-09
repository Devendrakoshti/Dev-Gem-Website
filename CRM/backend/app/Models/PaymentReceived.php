<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentReceived extends Model
{
    use HasFactory, HasUlids;
    
    protected $table = 'payments_received'; // Laravel might guess payment_receiveds

    protected $fillable = [
        'client_id',
        'amount_received',
        'payment_method',
        'reference_id',
        'received_date',
    ];

    protected $casts = [
        'amount_received' => 'decimal:2',
        'received_date' => 'datetime',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
