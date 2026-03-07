<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\BillingItem;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $isAdmin = $user->role === 'ADMIN';

        $stats = [
            'total_clients' => $isAdmin ? Client::count() : Client::where('assigned_to_id', $user->id)->count(),
            'active_clients' => $isAdmin ? Client::active()->count() : Client::where('assigned_to_id', $user->id)->active()->count(),
            'pending_payments' => $isAdmin ? BillingItem::where('status', '!=', 'PAID')->sum('remaining_amount') : BillingItem::whereHas('client', fn($q) => $q->where('assigned_to_id', $user->id))->where('status', '!=', 'PAID')->sum('remaining_amount'),
            'new_clients_this_month' => ($isAdmin ? Client::query() : Client::where('assigned_to_id', $user->id))->whereMonth('created_at', now()->month)->count(),
        ];

        if ($isAdmin) {
            $stats['total_employees'] = User::where('role', 'EMPLOYEE')->count();
        }

        return response()->json($stats);
    }
}
