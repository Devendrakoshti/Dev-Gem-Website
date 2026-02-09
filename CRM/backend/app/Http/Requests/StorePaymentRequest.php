<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'client_id' => 'required|exists:clients,id',
            'amount_received' => 'required|numeric|min:0',
            'payment_method' => 'nullable|string|max:191',
            'reference_id' => 'nullable|string|max:191',
            'received_date' => 'nullable|date',
        ];
    }
}
