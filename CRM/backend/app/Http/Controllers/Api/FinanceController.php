<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BillingItem;
use App\Models\PaymentReceived;
use App\Models\Client;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class FinanceController extends Controller
{
    use ApiResponse;

    public function getLedgerSummary($clientId) {
        $totalBilled = BillingItem::where('client_id', $clientId)->sum('amount_to_collect');
        $totalPaid = PaymentReceived::where('client_id', $clientId)->sum('amount_received');
        return $this->success([
            'total_billed' => (float) $totalBilled,
            'total_received' => (float) $totalPaid,
            'outstanding_balance' => (float) ($totalBilled - $totalPaid)
        ]);
    }

    public function getBilling($clientId) {
        return $this->success(BillingItem::where('client_id', $clientId)->latest()->get());
    }

    public function addBilling(Request $request) {
        $data = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'service_name' => 'required|string',
            'amount_to_collect' => 'required|numeric',
            'billing_date' => 'required|date',
            'description' => 'nullable|string'
        ]);
        $item = BillingItem::create($data);
        return $this->success($item, 'Billing added');
    }

    public function getPayments($clientId) {
        return $this->success(PaymentReceived::where('client_id', $clientId)->latest()->get());
    }

    public function addPayment(Request $request) {
        $data = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'amount_received' => 'required|numeric',
            'received_date' => 'required|date',
            'payment_mode' => 'required|string',
            'notes' => 'nullable|string'
        ]);
        $payment = PaymentReceived::create($data);
        return $this->success($payment, 'Payment recorded');
    }

    public function deleteBilling($id) {
        BillingItem::destroy($id);
        return $this->success([], 'Entry removed');
    }

    public function deletePayment($id) {
        PaymentReceived::destroy($id);
        return $this->success([], 'Entry removed');
    }

    public function getPendingPayments(Request $request) {
        $user = $request->user();
        $query = Client::query();
        if (!$user->isAdmin()) {
            $query->where('assigned_to_id', $user->id);
        }
        $clients = $query->get();
        $pending = [];
        foreach($clients as $client) {
            $totalBilled = BillingItem::where('client_id', $client->id)->sum('amount_to_collect');
            $totalReceived = PaymentReceived::where('client_id', $client->id)->sum('amount_received');
            $balance = $totalBilled - $totalReceived;
            if ($balance > 0) {
                $pending[] = [
                    'client' => $client,
                    'total_billed' => $totalBilled,
                    'outstanding_balance' => $balance
                ];
            }
        }
        return $this->success($pending);
    }
}