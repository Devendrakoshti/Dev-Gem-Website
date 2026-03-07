<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'employee_id' => 'required|string|unique:users,employee_id',
            'role' => 'required|in:ADMIN,EMPLOYEE',
            'status' => 'required|in:ACTIVE,SUSPENDED',
        ];
    }
}
