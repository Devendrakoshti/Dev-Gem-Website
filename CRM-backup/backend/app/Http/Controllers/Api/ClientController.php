<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Http\Requests\Api\ClientStoreRequest;
use App\Http\Requests\Api\ClientUpdateRequest;
use App\Http\Resources\ClientResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $query = Client::query()->with(['assignedTo', 'createdBy']);

        if (Auth::user()->role !== 'ADMIN') {
            $query->where('assigned_to_id', Auth::id());
        }

        if ($request->has('filter')) {
            switch ($request->filter) {
                case 'archived':
                    $query->where('is_archived', true);
                    break;
                case 'active':
                    $query->active();
                    break;
                case 'trash':
                    $query->onlyTrashed();
                    break;
            }
        }

        $clients = $query->latest()->paginate(15);

        return ClientResource::collection($clients);
    }

    public function store(ClientStoreRequest $request)
    {
        $client = Client::create($request->validated() + [
            'created_by_employee_id' => Auth::id(),
        ]);

        return new ClientResource($client->load(['assignedTo', 'createdBy']));
    }

    public function show(Client $client)
    {
        $this->authorize('view', $client);

        return new ClientResource($client->load(['assignedTo', 'createdBy', 'billingItems', 'payments', 'followUps', 'notes']));
    }

    public function update(ClientUpdateRequest $request, Client $client)
    {
        $this->authorize('update', $client);

        $client->update($request->validated());

        return new ClientResource($client->load(['assignedTo', 'createdBy']));
    }

    public function destroy(Client $client)
    {
        $this->authorize('delete', $client);

        $client->delete();

        return response()->json(['message' => 'Client deleted successfully']);
    }

    public function restore($id)
    {
        $client = Client::onlyTrashed()->findOrFail($id);
        $this->authorize('restore', $client);

        $client->restore();

        return response()->json(['message' => 'Client restored successfully']);
    }

    public function purge($id)
    {
        $client = Client::onlyTrashed()->findOrFail($id);
        $this->authorize('forceDelete', $client);

        $client->forceDelete();

        return response()->json(['message' => 'Client permanently deleted']);
    }
}
