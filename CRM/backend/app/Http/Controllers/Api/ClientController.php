<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\StoreClientRequest;
use App\Http\Resources\ClientResource;
use App\Models\Client;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ClientController extends Controller
{
    use ApiResponse;

    public function index(Request $request)
    {
        try {
            $user = $request->user();
            $query = Client::query();

            if (!$user->isAdmin()) {
                $query->where('assigned_to_id', $user->id);
            }

            $clients = $query->latest()->get();
            return $this->success(ClientResource::collection($clients), 'Clients retrieved successfully');
        } catch (\Exception $e) {
            return $this->error('Failed to retrieve clients: ' . $e->getMessage(), 500);
        }
    }

    public function store(StoreClientRequest $request)
    {
        try {
            $data = $request->validated();
            $data['created_by_id'] = $request->user()->id;
            
            if (!$request->user()->isAdmin() && !isset($data['assigned_to_id'])) {
                $data['assigned_to_id'] = $request->user()->id;
            }

            $client = Client::create($data);
            return $this->success(new ClientResource($client), 'Client created successfully', 201);
        } catch (\Exception $e) {
            return $this->error('Failed to create client: ' . $e->getMessage(), 500);
        }
    }

    public function show(Client $client)
    {
        try {
            Gate::authorize('view', $client);
            return $this->success(new ClientResource($client), 'Client retrieved successfully');
        } catch (\Exception $e) {
            return $this->error('Failed to retrieve client: ' . $e->getMessage(), 500);
        }
    }

    public function destroy(Client $client)
    {
        try {
            Gate::authorize('delete', $client);
            $client->softDelete();
            return $this->success([], 'Client deleted successfully');
        } catch (\Exception $e) {
            return $this->error('Failed to delete client: ' . $e->getMessage(), 500);
        }
    }
}