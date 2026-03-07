<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class ClientStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'mobile' => 'required|string|max:20',
            'company_name' => 'nullable|string|max:255',
            'company_address' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'status' => 'required|in:ACTIVE,INACTIVE',
            'stage' => 'required|in:NEW,CONTACTED,INTERESTED,CONVERTED,LOST',
            'assigned_to_id' => 'nullable|exists:users,id',
        ];
    }
}
