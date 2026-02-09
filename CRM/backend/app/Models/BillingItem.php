<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillingItem extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = [
        'client_id',
        'service_name',
        'amount_to_collect',
        'status',
        'due_date',
    ];

    protected $casts = [
        'amount_to_collect' => 'decimal:2',
        'due_date' => 'date',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
