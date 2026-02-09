<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Backup;
use App\Services\BackupService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BackupController extends Controller
{
    protected $backupService;

    public function __construct(BackupService $backupService)
    {
        $this->backupService = $backupService;
    }

    public function index()
    {
        $backups = Backup::orderBy('created_at', 'desc')->get();
        return response()->json(['success' => true, 'data' => $backups]);
    }

    public function store()
    {
        $user = Auth::user();
        if ($user->role !== 'ADMIN') {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        try {
            $backup = $this->backupService->createBackup($user);
            
            ActivityLog::create([
                'actor_id' => $user->id,
                'actor_name' => $user->name,
                'action' => "System backup generated: {$backup->filename}",
                'target_id' => $backup->id,
                'target_type' => 'BACKUP'
            ]);

            return response()->json(['success' => true, 'data' => $backup]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function download($id)
    {
        $backup = Backup::findOrFail($id);
        
        // Return file download
        return response($backup->data)
            ->header('Content-Type', 'application/json')
            ->header('Content-Disposition', "attachment; filename=\"{$backup->filename}\"");
    }
    
    public function destroy($id)
    {
         $user = Auth::user();
        if ($user->role !== 'ADMIN') {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }
        
        $backup = Backup::findOrFail($id);
        $backup->delete();
        
        ActivityLog::create([
                'actor_id' => $user->id,
                'actor_name' => $user->name,
                'action' => "Backup snapshot purged: {$id}",
                'target_id' => $id,
                'target_type' => 'BACKUP'
        ]);
            
        return response()->json(['success' => true, 'message' => 'Backup deleted']);
    }

    public function restore($id)
    {
        $user = Auth::user();
        if ($user->role !== 'ADMIN') {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        try {
            $this->backupService->restoreBackup($id);
            
             ActivityLog::create([
                'actor_id' => $user->id,
                'actor_name' => $user->name,
                'action' => "System restored from backup: {$id}",
                'target_id' => 'SYSTEM',
                'target_type' => 'SYSTEM'
            ]);

            return response()->json(['success' => true, 'message' => 'System restored successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Restore failed: ' . $e->getMessage()], 500);
        }
    }
}
