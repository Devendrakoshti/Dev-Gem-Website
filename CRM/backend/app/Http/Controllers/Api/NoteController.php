<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NoteController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'content' => 'required|string',
        ]);

        $note = Note::create($validated + [
            'author_id' => Auth::id(),
            'author_name' => Auth::user()->name,
        ]);

        event(new \App\Events\ClientDataChanged('note_added', $note));

        return response()->json($note, 201);
    }
}
