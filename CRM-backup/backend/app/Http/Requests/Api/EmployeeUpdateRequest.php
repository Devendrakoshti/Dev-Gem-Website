<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'first_name' => 'sometimes|required|string|max:255',
            'last_name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $this->route('employee')->id,
            'password' => 'sometimes|nullable|string|min:8',
            'employee_id' => 'sometimes|required|string|unique:users,employee_id,' . $this->route('employee')->id,
            'role' => 'sometimes|required|in:ADMIN,EMPLOYEE',
            'status' => 'sometimes|required|in:ACTIVE,SUSPENDED',
        ];
    }
}
