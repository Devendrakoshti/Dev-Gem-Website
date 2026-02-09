<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NoteController extends Controller
{
    public function index($clientId)
    {
        $client = Client::withTrashed()->findOrFail($clientId);
        // Authorization check?
        $user = Auth::user();
        if ($user->role !== 'ADMIN' && $client->assigned_to_id !== $user->id) {
             return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        $notes = Note::where('client_id', $clientId)->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $notes
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'client_id' => 'required|exists:clients,id',
            'content' => 'required|string',
        ]);

        $client = Client::withTrashed()->findOrFail($request->client_id);
        $user = Auth::user();
        if ($user->role !== 'ADMIN' && $client->assigned_to_id !== $user->id) {
             return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        $note = new Note();
        $note->client_id = $request->client_id;
        $note->content = $request->content;
        $note->employee_id = $user->id;
        $note->employee_name = $user->name;
        $note->save();

        return response()->json([
            'success' => true,
            'data' => $note
        ]);
    }
}
