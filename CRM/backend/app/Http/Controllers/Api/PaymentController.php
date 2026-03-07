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
}
