<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Traits\LogsActivity;

class PaymentReceived extends Model
{
    use HasFactory, LogsActivity;

    protected $table = 'payments_received';

    protected $fillable = [
        'client_id',
        'amount_received',
        'received_date',
        'payment_mode',
        'notes',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
