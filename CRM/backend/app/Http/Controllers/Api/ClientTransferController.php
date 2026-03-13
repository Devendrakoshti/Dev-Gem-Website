<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\User;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClientTransferController extends Controller
{
    public function transfer(Request $request, Client $client)
    {
        $this->authorize('transfer', $client);

        $request->validate([
            'employee_id' => 'required|exists:users,id',
        ]);

        $oldEmployeeId = $client->assigned_to_id;
        $newEmployeeId = $request->employee_id;

        $oldUser = User::find($oldEmployeeId);
        $newUser = User::find($newEmployeeId);

        $client->update([
            'assigned_to_id' => $newEmployeeId,
        ]);

        ActivityLog::create([
            'actor_id' => Auth::id(),
            'action' => 'Transferred',
            'target_id' => $client->id,
            'target_type' => 'CLIENT_TRANSFER',
            'metadata' => [
                'clientName' => $client->name,
                'fromId' => $oldEmployeeId,
                'fromName' => $oldUser ? $oldUser->name : 'System',
                'toId' => $newEmployeeId,
                'toName' => $newUser ? $newUser->name : 'Unknown',
            ],
        ]);

        return response()->json(['message' => 'Client transferred successfully']);
    }
}
