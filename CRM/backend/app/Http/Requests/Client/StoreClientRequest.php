<?php

namespace App\Http\Requests\Client;

use Illuminate\Foundation\Http\FormRequest;

class StoreClientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'mobile' => 'nullable|string|max:20',
            'company_name' => 'nullable|string|max:255',
            'company_address' => 'nullable|string',
            'stage' => 'nullable|in:NEW,CONTACTED,NEGOTIATION,WON,LOST',
            'assigned_to_id' => 'nullable|exists:users,id',
        ];
    }
}