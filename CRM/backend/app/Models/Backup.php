<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Backup extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = [
        'filename',
        'size',
        'created_by',
        'data',
    ];

    // No casts for 'data' as it might be huge string or we might want to decode manually
    // But user asked for JSON -> downloadable. storing as string is fine.
}
