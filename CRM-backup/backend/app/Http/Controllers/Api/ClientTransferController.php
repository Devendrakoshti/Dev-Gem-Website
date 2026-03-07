<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
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

        $client->update([
            'assigned_to_id' => $newEmployeeId,
        ]);

        ActivityLog::create([
            'actor_id' => Auth::id(),
            'action' => 'Transferred',
            'target_id' => $client->id,
            'target_type' => Client::class,
            'metadata' => [
                'old_employee_id' => $oldEmployeeId,
                'new_employee_id' => $newEmployeeId,
            ],
        ]);

        return response()->json(['message' => 'Client transferred successfully']);
    }
}
