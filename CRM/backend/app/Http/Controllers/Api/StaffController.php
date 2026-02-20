<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StaffController extends Controller
{
    use ApiResponse;

    public function index() {
        return $this->success(User::latest()->get());
    }

    public function store(Request $request) {
        $data = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:users',
            'employee_id' => 'required|unique:users',
            'password' => 'required|string',
            'role' => 'required|in:ADMIN,EMPLOYEE',
            'status' => 'nullable|in:ACTIVE,SUSPENDED'
        ]);
        $data['password'] = Hash::make($data['password']);
        if(!isset($data['status'])) $data['status'] = 'ACTIVE';
        
        $user = User::create($data);
        return $this->success($user, 'New staff member onboarded');
    }

    public function update(Request $request, User $staff) {
        $data = $request->validate([
            'first_name' => 'sometimes|string',
            'last_name' => 'sometimes|string',
            'role' => 'sometimes|in:ADMIN,EMPLOYEE',
            'status' => 'sometimes|in:ACTIVE,SUSPENDED',
            'employee_id' => 'sometimes|string'
        ]);
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }
        $staff->update($data);
        return $this->success($staff, 'Staff credentials updated');
    }

    public function destroy(User $staff) {
        $staff->softDelete(); 
        return $this->success([], 'Access revoked');
    }
}