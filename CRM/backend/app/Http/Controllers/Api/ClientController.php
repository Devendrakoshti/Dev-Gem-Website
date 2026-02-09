<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Models\ActivityLog;
use App\Models\Client;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ClientController extends Controller
{
    public function __construct()
    {
       // $this->authorizeResource(Client::class, 'client');
       // Policy authorization is handled manually for granular control over restored/forceDeleted items
    }

    public function index(Request $request)
    {
        $user = Auth::user();
        $query = Client::query();

        // Ownership Scoping
        if ($user->role !== 'ADMIN') {
            $query->where('assigned_to_id', $user->id);
        }

        // Status Filtering
        $filter = $request->query('filter', 'active'); // active, archived, deleted

        if ($filter === 'deleted') {
            $query->onlyTrashed();
        } elseif ($filter === 'archived') {
            $query->where('is_archived', true);
        } else {
            // Default active
            $query->where('is_archived', false);
        }

        $clients = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $clients
        ]);
    }

    public function store(StoreClientRequest $request)
    {
        $user = Auth::user();

        DB::beginTransaction();
        try {
            $client = new Client();
            $client->fill($request->validated());
            
            // Assign defaults
            $client->assigned_to_id = $request->input('assigned_to_id', $user->id); 
            $client->assigned_to_name = User::find($client->assigned_to_id)->name ?? 'Unknown';
            $client->created_by_employee_id = $user->id;
            
            $client->save();

            $this->logActivity($user, "Created client: {$client->name}", $client->id, 'CLIENT');

            DB::commit();

            return response()->json([
                'success' => true,
                'data' => $client
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to create client: ' . $e->getMessage(),
                'code' => 500
            ], 500);
        }
    }

    public function show($id)
    {
        $client = Client::withTrashed()->findOrFail($id);
        $this->authorize('view', $client);

        return response()->json([
            'success' => true,
            'data' => $client
        ]);
    }

    public function update(UpdateClientRequest $request, $id)
    {
        $client = Client::withTrashed()->findOrFail($id);
        $this->authorize('update', $client);

        $client->fill($request->validated());
        $client->save();

        $this->logActivity(Auth::user(), "Updated client record: {$client->id}", $client->id, 'CLIENT');

        return response()->json([
            'success' => true,
            'data' => $client
        ]);
    }

    public function destroy($id)
    {
        $client = Client::findOrFail($id); // Only find non-deleted
        $this->authorize('delete', $client);

        $client->delete(); // Soft delete

        $this->logActivity(Auth::user(), "Moved to Trash: {$client->name}", $client->id, 'CLIENT');

        return response()->json([
            'success' => true,
            'message' => 'Client moved to trash'
        ]);
    }

    public function restore($id)
    {
        $client = Client::onlyTrashed()->findOrFail($id);
        $this->authorize('restore', $client);

        $client->restore();

        $this->logActivity(Auth::user(), "Restored from Trash: {$client->name}", $client->id, 'CLIENT');

        return response()->json([
            'success' => true,
            'message' => 'Client restored successfully'
        ]);
    }

    public function forceDelete($id)
    {
        $client = Client::withTrashed()->findOrFail($id);
        $this->authorize('forceDelete', $client);

        $name = $client->name;
        $client->forceDelete();

        $this->logActivity(Auth::user(), "Permanently Deleted: {$name}", $id, 'CLIENT');

        return response()->json([
            'success' => true,
            'message' => 'Client permanently deleted'
        ]);
    }
    
    public function transfer(Request $request, $id)
    {
        $client = Client::withTrashed()->findOrFail($id);
        
        // Ownership check - handled by policy mostly but transfer is special
        // Admin can transfer anyone. Owner can transfer own.
        // Re-use update policy for now, or check manually
        if (Auth::user()->role !== 'ADMIN' && $client->assigned_to_id !== Auth::id()) {
            return response()->json(['success' => false, 'message' => 'Unauthorized', 'code' => 403], 403);
        }
        
        $request->validate(['to_employee_id' => 'required|exists:users,id']);
        
        $targetUser = User::findOrFail($request->to_employee_id);
        
        $fromId = $client->assigned_to_id;
        $fromName = $client->assignedToUser->name ?? 'Unknown';
        
        $client->assigned_to_id = $targetUser->id;
        $client->assigned_to_name = $targetUser->name;
        $client->save();
        
        $this->logActivity(Auth::user(), "Transferred client [{$client->name}] to {$targetUser->name}", $client->id, 'CLIENT_TRANSFER', [
            'fromId' => $fromId,
            'toId' => $targetUser->id,
            'fromName' => $fromName,
            'toName' => $targetUser->name
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Client transferred successfully',
            'data' => $client
        ]);
    }

    private function logActivity($user, $action, $targetId, $targetType, $metadata = null)
    {
        ActivityLog::create([
            'actor_id' => $user->id,
            'actor_name' => $user->name,
            'action' => $action,
            'target_id' => $targetId,
            'target_type' => $targetType,
            'metadata' => $metadata // Casts to JSON automatically
        ]);
    }
    public function getAssignableUsers()
    {
        $users = User::where('role', 'EMPLOYEE')
                     ->whereNull('deleted_at')
                     ->select('id', 'name', 'employee_id')
                     ->get();

        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }
}
