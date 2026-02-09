<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBillingRequest;
use App\Http\Requests\StorePaymentRequest;
use App\Models\ActivityLog;
use App\Models\BillingItem;
use App\Models\Client;
use App\Models\PaymentReceived;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FinanceController extends Controller
{
    // Get Billing items for a client
    public function indexBilling(Request $request, $clientId)
    {
        $client = Client::withTrashed()->findOrFail($clientId);
        $this->authorizeAccess($client);

        $items = BillingItem::where('client_id', $clientId)->orderBy('created_at', 'desc')->get();

        return response()->json(['success' => true, 'data' => $items]);
    }

    // Get Payments for a client
    public function indexPayments(Request $request, $clientId)
    {
        $client = Client::withTrashed()->findOrFail($clientId);
        $this->authorizeAccess($client);

        $payments = PaymentReceived::where('client_id', $clientId)->orderBy('received_date', 'desc')->get();

        return response()->json(['success' => true, 'data' => $payments]);
    }

    // Add Billing Item
    public function storeBilling(StoreBillingRequest $request)
    {
        $client = Client::withTrashed()->findOrFail($request->client_id);
        $this->authorizeAccess($client);

        $item = new BillingItem($request->validated());
        $item->save();

        $this->logActivity(Auth::user(), "Added billing: {$item->service_name}", $item->id, 'PAYMENT');

        return response()->json(['success' => true, 'data' => $item]);
    }

    // Add Payment
    public function storePayment(StorePaymentRequest $request)
    {
        $client = Client::withTrashed()->findOrFail($request->client_id);
        $this->authorizeAccess($client);

        $payment = new PaymentReceived($request->validated());
        if (!$payment->received_date) {
            $payment->received_date = now();
        }
        $payment->save();

        $this->logActivity(Auth::user(), "Payment logged: {$payment->amount_received}", $payment->id, 'PAYMENT');

        return response()->json(['success' => true, 'data' => $payment]);
    }

    // Pending Payments Summary (Dashboard Widget)
    public function getPendingPayments(Request $request)
    {
        $user = Auth::user();
        $clientsQuery = Client::query();

        if ($user->role !== 'ADMIN') {
            $clientsQuery->where('assigned_to_id', $user->id);
        }

        // Only active clients
        $clients = $clientsQuery->where('is_archived', false)->get();

        $pending = [];

        foreach ($clients as $client) {
            // Aggregate in PHP as simple logic, could be optimized with raw SQL/subqueries for huge datasets
            $totalBilled = BillingItem::where('client_id', $client->id)->sum('amount_to_collect');
            $totalPaid = PaymentReceived::where('client_id', $client->id)->sum('amount_received');
            $balance = $totalBilled - $totalPaid;

            if ($balance > 0) {
                // Get last payment date
                $lastPayment = PaymentReceived::where('client_id', $client->id)
                    ->orderBy('received_date', 'desc')
                    ->first();

                $pending[] = [
                    'client' => $client,
                    'totalBilled' => (float)$totalBilled, // Ensure float for JSON
                    'totalPaid' => (float)$totalPaid,
                    'balance' => (float)$balance,
                    'lastPaymentDate' => $lastPayment ? $lastPayment->received_date : null
                ];
            }
        }

        return response()->json(['success' => true, 'data' => $pending]);
    }

    // Helper for explicit policy check inside custom methods
    private function authorizeAccess(Client $client)
    {
        $user = Auth::user();
        if ($user->role !== 'ADMIN' && $client->assigned_to_id !== $user->id) {
            abort(403, 'Unauthorized access to client finance records.');
        }
    }

    private function logActivity($user, $action, $targetId, $targetType, $metadata = null)
    {
        ActivityLog::create([
            'actor_id' => $user->id,
            'actor_name' => $user->name,
            'action' => $action,
            'target_id' => $targetId,
            'target_type' => $targetType,
            'metadata' => $metadata
        ]);
    }
}
