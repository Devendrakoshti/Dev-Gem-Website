<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FollowUp;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class FollowUpController extends Controller
{
    use ApiResponse;

    public function index($clientId) {
        return $this->success(FollowUp::where('client_id', $clientId)->latest()->get());
    }

    public function store(Request $request) {
        $data = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'type' => 'required|string',
            'next_date' => 'required|date',
            'notes' => 'required|string'
        ]);
        $data['employee_id'] = $request->user()->id;
        $data['date'] = now()->toDateString();
        $followup = FollowUp::create($data);
        return $this->success($followup, 'Interaction logged');
    }
}