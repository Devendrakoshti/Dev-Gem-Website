<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Traits\LogsActivity;

class FollowUp extends Model
{
    use HasFactory, LogsActivity;

    protected $table = 'follow_ups';

    protected $fillable = [
        'client_id',
        'date',
        'next_date',
        'type',
        'notes',
        'employee_id',
    ];

    protected $casts = [
        'date' => 'datetime',
        'next_date' => 'datetime',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function employee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'employee_id');
    }
}
