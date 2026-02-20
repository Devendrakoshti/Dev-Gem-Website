<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Traits\ApiResponse;

class ActivityController extends Controller
{
    use ApiResponse;

    public function index() {
        return $this->success(ActivityLog::latest()->get());
    }

    public function transfers() {
        return $this->success(ActivityLog::where('target_type', 'CLIENT_TRANSFER')->latest()->get());
    }
}