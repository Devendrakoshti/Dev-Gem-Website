<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class EmployeeController extends Controller
{
    public function __construct()
    {
        // Route group should enforce 'role:ADMIN' middleware
    }

    public function index(Request $request)
    {
        // Active employees
        $employees = User::where('role', 'EMPLOYEE')->get();
        return response()->json(['success' => true, 'data' => $employees]);
    }

    public function trash(Request $request)
    {
        // Deleted employees
        $employees = User::onlyTrashed()->where('role', 'EMPLOYEE')->get();
        return response()->json(['success' => true, 'data' => $employees]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:191',
            'email' => 'required|email|max:191|unique:users,email',
            'employee_id' => 'required|string|max:191|unique:users,employee_id',
            'password' => 'required|string|min:6',
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->employee_id = $request->employee_id;
        $user->password = Hash::make($request->password);
        $user->role = 'EMPLOYEE';
        $user->save();

        $this->logActivity(Auth::user(), "User provisioned: {$user->name}", $user->id, 'EMPLOYEE');

        return response()->json(['success' => true, 'data' => $user]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        $request->validate([
            'name' => 'sometimes|required|string|max:191',
            'email' => ['sometimes','required','email', Rule::unique('users')->ignore($user->id)],
            // 'employee_id' usually immutable, but allowing update if needed
        ]);

        $user->update($request->only(['name', 'email'])); // Password update usually separate

        $this->logActivity(Auth::user(), "User profile updated: {$user->id}", $user->id, 'EMPLOYEE');

        return response()->json(['success' => true, 'data' => $user]);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        if ($user->role === 'ADMIN') {
            return response()->json(['success' => false, 'message' => 'Cannot delete admin'], 403);
        }

        $user->delete();
        $this->logActivity(Auth::user(), "User account suspended: {$user->name}", $user->id, 'EMPLOYEE');

        return response()->json(['success' => true, 'message' => 'User suspended']);
    }

    public function restore($id)
    {
        $user = User::onlyTrashed()->findOrFail($id);
        $user->restore();

        $this->logActivity(Auth::user(), "User access restored: {$user->name}", $user->id, 'EMPLOYEE');

        return response()->json(['success' => true, 'message' => 'User restored']);
    }

    public function forceDelete($id)
    {
        $user = User::withTrashed()->findOrFail($id);
        $name = $user->name;
        $user->forceDelete();

        $this->logActivity(Auth::user(), "User account purged: {$id}", $id, 'EMPLOYEE');

        return response()->json(['success' => true, 'message' => 'User permanently deleted']);
    }

    private function logActivity($user, $action, $targetId, $targetType, $metadata = null)
    {
        ActivityLog::create([
            'actor_id' => $user->id,
            'actor_name' => $user->name,
            'action' => $action,
            'target_id' => $targetId,
            'target_type' => $targetType,
            'metadata' => $metadata
        ]);
    }
}
