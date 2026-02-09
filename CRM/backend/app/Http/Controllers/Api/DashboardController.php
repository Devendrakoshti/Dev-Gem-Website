<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\FollowUp;
use App\Models\User;
use App\Models\BillingItem;
use App\Models\PaymentReceived;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function summary()
    {
        $user = Auth::user();
        $isAdmin = $user->role === 'ADMIN';

        // 1. Client Scoping
        $clientQuery = Client::query();
        if (!$isAdmin) {
            $clientQuery->where('assigned_to_id', $user->id);
        }

        // 2. Client Stats
        // Clone query for different counts to avoid resetting
        $totalClients = (clone $clientQuery)->count();
        $activeClients = (clone $clientQuery)->where('is_archived', false)->count();
        $archivedClients = (clone $clientQuery)->where('is_archived', true)->count();
        
        // 3. Employee Stats (Admin Only)
        $employeeCount = 0;
        if ($isAdmin) {
            $employeeCount = User::where('role', 'EMPLOYEE')->count();
        }

        // 4. Follow-ups (Today & Overdue)
        // Frontend logic: Admin sees all, Employee sees assigned
        $followUpQuery = FollowUp::query();
        if (!$isAdmin) {
            $followUpQuery->where('employee_id', $user->id);
        }

        $today = now()->format('Y-m-d');
        
        $todayActions = (clone $followUpQuery)->where('next_date', $today)->count();
        
        // Fetch actual overdue items for alerts (limit to reasonable number)
        $overdueFollowUps = (clone $followUpQuery)
            ->where('next_date', '<', $today)
            ->with('client:id,name,company_name')
            ->orderBy('next_date', 'asc')
            ->limit(10)
            ->get();    

        // 5. High Exposure Clients (Balance >= 100,000)
        // This is heavy. usage of subqueries or raw aggregation is best.
        // We need clients where (sum(billing) - sum(payments)) >= 100000
        
        // Let's rely on collection processing for now for simplicity if dataset is small, 
        // OR better: use matching logic to FinanceController but optimized.
        // We'll fetch clients with their billings/payments sums.
        
        $highExposureQuery = (clone $clientQuery)->where('is_archived', false);
        
        // Optimization: We can't easily do "having" on computed sum of related models without joining.
        // We will fetch ID and totals using withSum.
        $highExposureCandidates = $highExposureQuery
            ->withSum('billingItems as total_billed', 'amount_to_collect')
            ->withSum('paymentsReceived as total_paid', 'amount_received')
            ->get();

        $highExposureClients = $highExposureCandidates->filter(function ($client) {
            $balance = ($client->total_billed ?? 0) - ($client->total_paid ?? 0);
            return $balance >= 100000;
        })->map(function ($client) {
            return [
                'id' => $client->id,
                'name' => $client->name,
                'balance' => ($client->total_billed ?? 0) - ($client->total_paid ?? 0)
            ];
        })->values();

        // 6. Today's Actions Detail (for the widget list)
        $todayFollowUpsList = (clone $followUpQuery)
            ->where('next_date', $today)
            ->with('client:id,name,company_name')
            ->limit(10)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'counts' => [
                    'total_clients' => $totalClients,
                    'active_clients' => $activeClients,
                    'archived_clients' => $archivedClients,
                    'employees' => $employeeCount,
                    'today_actions' => $todayActions,
                    'critical_alerts' => $overdueFollowUps->count() + $highExposureClients->count()
                ],
                'widgets' => [
                    'today_actions' => $todayFollowUpsList,
                    'overdue_actions' => $overdueFollowUps,
                    'high_exposure_clients' => $highExposureClients
                ]
            ]
        ]);
    }
}
