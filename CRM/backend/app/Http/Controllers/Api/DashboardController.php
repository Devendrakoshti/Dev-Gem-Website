<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\BillingItem;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Services\CrmCacheService;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $data = CrmCacheService::rememberDashboard($user, function () use ($user) {
            $isAdmin = $user->role === 'ADMIN';

            // TCV & Financials
            $totalTCV = BillingItem::sum('amount_to_collect');
            $totalCollected = BillingItem::sum('paid_amount');
            $totalPending = $totalTCV - $totalCollected;

            // Portfolio for current user
            $myClients = Client::where('assigned_to_id', $user->id)->pluck('id');
            $myTCV = BillingItem::whereIn('client_id', $myClients)->sum('amount_to_collect');
            $myCollected = BillingItem::whereIn('client_id', $myClients)->sum('paid_amount');
            $myPending = $myTCV - $myCollected;

            // Funnel Data
            $stages = ['NEW', 'CONTACTED', 'INTERESTED', 'CONVERTED', 'LOST'];
            $funnel = [];
            foreach ($stages as $stage) {
                $funnel[] = [
                    'label' => $stage,
                    'count' => Client::where('stage', $stage)->where('is_deleted', false)->count()
                ];
            }

            $myFunnel = [];
            foreach ($stages as $stage) {
                $myFunnel[] = [
                    'label' => $stage,
                    'count' => Client::where('assigned_to_id', $user->id)->where('stage', $stage)->where('is_deleted', false)->count()
                ];
            }

            // Leaderboard (Single query with withCount instead of N+1 loop)
            $leaderboard = User::where('role', 'EMPLOYEE')
                ->where('is_deleted', false)
                ->withCount(['assignedClients as converted' => function ($q) {
                    $q->where('stage', 'CONVERTED');
                }])
                ->orderByDesc('converted')
                ->take(5)
                ->get()
                ->map(function ($emp) {
                    return [
                        'id' => $emp->id,
                        'name' => "{$emp->first_name} {$emp->last_name}",
                        'firstName' => $emp->first_name,
                        'lastName' => $emp->last_name,
                        'employeeId' => $emp->employee_id,
                        'converted' => (int) $emp->converted
                    ];
                });

            return [
                'tcv' => $totalTCV,
                'collected' => $totalCollected,
                'pending' => $totalPending,
                'active_leads' => Client::whereNotIn('stage', ['CONVERTED', 'LOST'])->where('is_deleted', false)->count(),
                'conversion_rate' => Client::where('is_deleted', false)->count() > 0 ? number_format((Client::where('stage', 'CONVERTED')->count() / Client::where('is_deleted', false)->count()) * 100, 1) . '%' : '0%',
                'workforce' => User::where('role', 'EMPLOYEE')->where('is_deleted', false)->count(),
                'my_tcv' => $myTCV,
                'my_collected' => $myCollected,
                'my_conversions' => Client::where('assigned_to_id', $user->id)->where('stage', 'CONVERTED')->count(),
                'my_active' => Client::where('assigned_to_id', $user->id)->whereNotIn('stage', ['CONVERTED', 'LOST'])->where('is_deleted', false)->count(),
                'my_conversion_rate' => Client::where('assigned_to_id', $user->id)->where('is_deleted', false)->count() > 0 ? number_format((Client::where('assigned_to_id', $user->id)->where('stage', 'CONVERTED')->count() / Client::where('assigned_to_id', $user->id)->count()) * 100, 1) . '%' : '0%',
                'funnel' => $funnel,
                'my_funnel' => $myFunnel,
                'leaderboard' => $leaderboard,
                'activity' => \App\Models\ActivityLog::latest()->take(10)->get()
            ];
        });

        return response()->json($data);
    }

    public function activity()
    {
        $logs = \App\Models\ActivityLog::with('actor')->latest()->paginate(50);

        $mappedLogs = collect($logs->items())->map(function ($log) {
            return [
                'id' => $log->id,
                'actorId' => $log->actor_id,
                'actorName' => $log->actor ? "{$log->actor->first_name} {$log->actor->last_name}" : 'System',
                'action' => $log->action,
                'targetId' => $log->target_id,
                'targetType' => $log->target_type,
                'timestamp' => $log->created_at->toISOString(),
                'metadata' => $log->metadata,
            ];
        });

        return response()->json([
            'data' => $mappedLogs,
            'current_page' => $logs->currentPage(),
            'last_page' => $logs->lastPage(),
            'total' => $logs->total(),
        ]);
    }
}
