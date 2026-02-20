<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FollowUp extends Model
{
    protected $fillable = [
        'client_id',
        'employee_id',
        'date',
        'next_date',
        'type',
        'notes',
    ];

    protected $casts = [
        'date' => 'date',
        'next_date' => 'date',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function employee()
    {
        return $this->belongsTo(User::class, 'employee_id');
    }
}