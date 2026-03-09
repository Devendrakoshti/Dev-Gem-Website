<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BillingItem;
use Illuminate\Http\Request;

class BillingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'service_name' => 'required|string',
            'amount_to_collect' => 'required|numeric',
            'billing_date' => 'required|date',
            'description' => 'nullable|string',
        ]);

        $billingItem = BillingItem::create($validated + [
            'remaining_amount' => $request->amount_to_collect,
            'status' => 'UNPAID',
        ]);

        return response()->json($billingItem, 201);
    }

    public function destroy(BillingItem $billingItem)
    {
        $billingItem->delete();
        return response()->json(null, 204);
    }
}
