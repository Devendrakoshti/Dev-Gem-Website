<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FollowUp extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = [
        'client_id',
        'date',
        'next_date',
        'type', // CALL, EMAIL, MEETING
        'notes',
        'employee_id',
        'employee_name',
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
