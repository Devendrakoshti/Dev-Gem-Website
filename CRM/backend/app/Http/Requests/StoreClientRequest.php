<?php

namespace App\Http\Requests;

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
            'name' => 'required|string|max:191',
            'email' => 'nullable|email|max:191|unique:clients,email',
            'mobile' => 'nullable|string|max:191',
            'company_name' => 'nullable|string|max:191',
            'company_address' => 'nullable|string|max:191',
            'status' => 'required|in:ACTIVE,INACTIVE',
            'stage' => 'required|in:NEW,CONTACTED,LOST',
        ];
    }
}
