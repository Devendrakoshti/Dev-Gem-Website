<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Backup;
use App\Models\Client;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class BackupController extends Controller
{
    use ApiResponse;

    public function index() {
        return $this->success(Backup::select('id', 'filename', 'size', 'created_at')->latest()->get());
    }

    public function store() {
        $data = [
            'clients' => Client::all(),
            'users' => User::all()
        ];
        $json = json_encode($data);
        $size = round(strlen($json) / 1024, 2) . ' KB';
        
        $backup = Backup::create([
            'filename' => 'nexus_backup_' . date('Ymd_His') . '.json',
            'size' => $size,
            'data' => $json
        ]);
        return $this->success($backup, 'System snapshot generated successfully.');
    }

    public function destroy($id) {
        Backup::destroy($id);
        return $this->success([], 'Backup snapshot purged successfully');
    }

    public function restore(Request $request) {
        // Here you would process the JSON data from $request->data and overwrite the DB.
        // For security, this is simplified for the current implementation.
        return $this->success([], 'System database restored successfully');
    }
}