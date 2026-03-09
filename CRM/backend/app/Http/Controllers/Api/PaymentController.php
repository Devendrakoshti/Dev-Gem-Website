<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{

    public function pendingPayments()
    {
        $user = Auth::user();
        $query = Client::whereHas('billingItems', function ($q) {
            $q->where('remaining_amount', '>', 0);
        })->with(['billingItems' => function ($q) {
            $q->where('remaining_amount', '>', 0);
        }, 'assignedTo']);

        if ($user->role !== 'ADMIN') {
            $query->where('assigned_to_id', $user->id);
        }

        $clients = $query->paginate(15);

        return response()->json($clients);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'amount_received' => 'required|numeric',
            'received_date' => 'required|date',
            'payment_mode' => 'required|in:CASH,UPI,BANK',
            'notes' => 'nullable|string',
        ]);

        $payment = \App\Models\PaymentReceived::create($validated);

        // Update billing items logic would go here in a full app
        // For now, just recording the payment as requested.

        return response()->json($payment, 201);
    }

    public function destroy($id)
    {
        $payment = \App\Models\PaymentReceived::findOrFail($id);
        $payment->delete();
        return response()->json(null, 204);
    }
}
