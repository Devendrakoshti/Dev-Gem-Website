<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\FollowUp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ActivityLog;

class FollowUpController extends Controller
{
    public function index($clientId)
    {
        $client = Client::withTrashed()->findOrFail($clientId);
        $user = Auth::user();
        if ($user->role !== 'ADMIN' && $client->assigned_to_id !== $user->id) {
             return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        $followups = FollowUp::where('client_id', $clientId)->orderBy('date', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $followups
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'client_id' => 'required|exists:clients,id',
            'date' => 'required|date',
            'next_date' => 'nullable|date',
            'type' => 'required|string',
            'notes' => 'required|string',
        ]);

        $client = Client::withTrashed()->findOrFail($request->client_id);
        $user = Auth::user();
        if ($user->role !== 'ADMIN' && $client->assigned_to_id !== $user->id) {
             return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        $followup = new FollowUp();
        $followup->fill($request->all());
        $followup->employee_id = $user->id; // Ensure current user
        $followup->employee_name = $user->name;
        $followup->save();

        ActivityLog::create([
            'actor_id' => $user->id,
            'actor_name' => $user->name,
            'action' => "Logged interaction for client {$client->id}",
            'target_id' => $followup->id,
            'target_type' => 'FOLLOWUP',
        ]);

        return response()->json([
            'success' => true,
            'data' => $followup
        ]);
    }
}
