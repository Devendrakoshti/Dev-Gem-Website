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
    public function __construct(protected \App\Services\LeadService $leadService)
    {
    }

    public function index(Request $request)
    {
        $clients = $this->leadService->index($request->all());

        return ClientResource::collection($clients);
    }

    public function store(ClientStoreRequest $request)
    {
        $client = Client::create($request->validated() + [
            'created_by_employee_id' => Auth::id(),
        ]);

        $resource = new ClientResource($client->load(['assignedTo', 'createdBy']));
        
        event(new \App\Events\ClientDataChanged('created', $resource));

        return $resource;
    }

    public function show(Client $client)
    {
        $this->authorize('view', $client);

        return new ClientResource($client->load(['assignedTo', 'createdBy', 'billingItems', 'payments', 'followUps', 'notes']));
    }

    public function update(ClientUpdateRequest $request, Client $client)
    {
        $this->authorize('update', $client);

        $client = $this->leadService->update($client->id, $request->validated());

        $resource = new ClientResource($client->load(['assignedTo', 'createdBy']));

        event(new \App\Events\ClientDataChanged('updated', $resource));

        return $resource;
    }

    public function destroy(Client $client)
    {
        $this->authorize('delete', $client);

        $clientId = $client->id;
        $client->delete();

        event(new \App\Events\ClientDataChanged('deleted', ['id' => $clientId]));

        return response()->json(['message' => 'Client deleted successfully']);
    }

    public function restore($id)
    {
        $client = Client::onlyTrashed()->findOrFail($id);
        $this->authorize('restore', $client);

        $client->restore();

        event(new \App\Events\ClientDataChanged('restored', ['id' => $id]));

        return response()->json(['message' => 'Client restored successfully']);
    }

    public function purge($id)
    {
        $client = Client::onlyTrashed()->findOrFail($id);
        $this->authorize('forceDelete', $client);

        $client->forceDelete();

        event(new \App\Events\ClientDataChanged('purged', ['id' => $id]));

        return response()->json(['message' => 'Client permanently deleted']);
    }
}
