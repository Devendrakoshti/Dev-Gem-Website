<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FollowUp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowUpController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'type' => 'required|in:CALL,MEETING,EMAIL',
            'date' => 'required|date',
            'next_date' => 'nullable|date',
            'notes' => 'required|string',
        ]);

        $followUp = FollowUp::create($validated + [
            'employee_id' => Auth::id(),
            'employee_name' => Auth::user()->name,
        ]);

        event(new \App\Events\ClientDataChanged('followup_added', $followUp));

        return response()->json($followUp, 201);
    }
}
