<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\BillingItem;
use App\Models\PaymentReceived;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    use ApiResponse;

    public function index(Request $request)
    {
        try {
            $user = $request->user();
            
            $clientQuery = Client::query();
            $billingQuery = BillingItem::query();
            $paymentQuery = PaymentReceived::query();

            if (!$user->isAdmin()) {
                $clientQuery->where('assigned_to_id', $user->id);
                $clientIds = $clientQuery->pluck('id');
                $billingQuery->whereIn('client_id', $clientIds);
                $paymentQuery->whereIn('client_id', $clientIds);
            }

            $stats = [
                'total_clients' => $clientQuery->count(),
                'clients_by_stage' => $clientQuery->selectRaw('stage, count(*) as count')->groupBy('stage')->pluck('count', 'stage'),
                'total_billed' => (float) $billingQuery->sum('amount_to_collect'),
                'total_received' => (float) $paymentQuery->sum('amount_received'),
            ];
            
            $stats['total_outstanding'] = $stats['total_billed'] - $stats['total_received'];

            return $this->success($stats, 'Dashboard statistics retrieved');
        } catch (\Exception $e) {
            return $this->error('Failed to load dashboard: ' . $e->getMessage(), 500);
        }
    }
}