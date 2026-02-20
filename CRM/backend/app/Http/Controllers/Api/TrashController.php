<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class TrashController extends Controller
{
    use ApiResponse;

    public function index(Request $request) {
        $type = $request->query('type', 'CLIENTS');
        if ($type === 'EMPLOYEES') {
            $data = User::withoutGlobalScope('is_deleted')->where('is_deleted', true)->get();
        } else {
            $data = Client::withoutGlobalScope('is_deleted')->where('is_deleted', true)->get();
        }
        return $this->success($data);
    }

    public function restore(Request $request) {
        if ($request->type === 'EMPLOYEE') {
            User::withoutGlobalScope('is_deleted')->where('id', $request->id)->update(['is_deleted' => false]);
        } else {
            Client::withoutGlobalScope('is_deleted')->where('id', $request->id)->update(['is_deleted' => false]);
        }
        return $this->success([], 'Record restored successfully');
    }

    public function purge(Request $request) {
        if ($request->type === 'EMPLOYEE') {
            User::withoutGlobalScope('is_deleted')->where('id', $request->id)->delete();
        } else {
            Client::withoutGlobalScope('is_deleted')->where('id', $request->id)->delete();
        }
        return $this->success([], 'Record permanently scrubbed');
    }
}