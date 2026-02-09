<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBillingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'client_id' => 'required|exists:clients,id',
            'service_name' => 'required|string|max:191',
            'amount_to_collect' => 'required|numeric|min:0',
            'status' => 'required|in:PENDING,PAID',
            'due_date' => 'nullable|date',
        ];
    }
}
