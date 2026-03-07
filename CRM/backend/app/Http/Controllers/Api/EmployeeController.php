<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\Api\EmployeeStoreRequest;
use App\Http\Requests\Api\EmployeeUpdateRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = User::where('role', 'EMPLOYEE')->latest()->paginate(15);
        return UserResource::collection($employees);
    }

    public function store(EmployeeStoreRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);

        $employee = User::create($data);

        return new UserResource($employee);
    }

    public function show(User $employee)
    {
        if ($employee->role !== 'EMPLOYEE') {
            abort(404);
        }

        return new UserResource($employee);
    }

    public function update(EmployeeUpdateRequest $request, User $employee)
    {
        if ($employee->role !== 'EMPLOYEE') {
            abort(404);
        }

        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $employee->update($data);

        return new UserResource($employee);
    }

    public function destroy(User $employee)
    {
        if ($employee->role !== 'EMPLOYEE') {
            abort(404);
        }

        $employee->delete();

        return response()->json(['message' => 'Employee deleted successfully']);
    }
}
