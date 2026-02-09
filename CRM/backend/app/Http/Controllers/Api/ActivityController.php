<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ActivityController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        
        // Admin sees all, Employee sees own actions
        $query = ActivityLog::query();
        
        if ($user->role !== 'ADMIN') {
            $query->where('actor_id', $user->id);
        }
        
        $logs = $query->orderBy('timestamp', 'desc')->paginate(50); // Pagination recommended for logs
        
        return response()->json(['success' => true, 'data' => $logs]);
    }
}
