<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateClientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Policy handles authorization
    }

    public function rules(): array
    {
        return [
            'name' => 'sometimes|required|string|max:191',
            'email' => [
                'nullable',
                'email',
                'max:191',
                Rule::unique('clients', 'email')->ignore($this->route('client')),
            ],
            'mobile' => 'nullable|string|max:191',
            'company_name' => 'nullable|string|max:191',
            'company_address' => 'nullable|string|max:191',
            'status' => 'sometimes|required|in:ACTIVE,INACTIVE',
            'stage' => 'sometimes|required|in:NEW,CONTACTED,LOST',
        ];
    }
}
