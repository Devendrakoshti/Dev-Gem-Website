<?php

namespace App\Services;

use App\Models\ActivityLog;
use App\Models\Backup;
use App\Models\BillingItem;
use App\Models\Client;
use App\Models\FollowUp;
use App\Models\Note;
use App\Models\PaymentReceived;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Exception;

class BackupService
{
    public function createBackup($user)
    {
        // Snapshot Data
        $data = [
            'users' => User::withTrashed()->get(),
            'clients' => Client::withTrashed()->get(),
            'billing_items' => BillingItem::all(),
            'payments_received' => PaymentReceived::all(),
            'follow_ups' => FollowUp::all(),
            'notes' => Note::all(),
            'activity_logs' => ActivityLog::all(),
            'generated_at' => now()->toISOString(),
            'version' => '1.0'
        ];

        $json = json_encode($data);
        $size = strlen($json);

        $backup = new Backup();
        $backup->filename = 'nexus_backup_' . now()->format('Y-m-d_H-i-s') . '.json';
        $backup->size = $this->formatBytes($size);
        $backup->created_by = $user->name;
        $backup->data = $json;
        $backup->save();

        return $backup;
    }

    public function restoreBackup($backupId)
    {
        $backup = Backup::findOrFail($backupId);
        $data = json_decode($backup->data, true);

        if (!$data || !isset($data['users'])) {
            throw new Exception("Invalid backup file format.");
        }

        DB::beginTransaction();
        try {
            // Disable Foreign Key Checks to allow truncation/insert
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');

            // Truncate Tables
            User::truncate();
            Client::truncate();
            BillingItem::truncate();
            PaymentReceived::truncate();
            FollowUp::truncate();
            Note::truncate();
            ActivityLog::truncate();

            // Insert Data
            // Note: Timestamps are handled by avoiding Eloquent 'created_at' override if using insert(),
            // but we want to restore exact state. Simple mass insert is best.
            
            if (!empty($data['users'])) User::insert($data['users']);
            if (!empty($data['clients'])) Client::insert($data['clients']);
            if (!empty($data['billing_items'])) BillingItem::insert($data['billing_items']);
            if (!empty($data['payments_received'])) PaymentReceived::insert($data['payments_received']);
            if (!empty($data['follow_ups'])) FollowUp::insert($data['follow_ups']);
            if (!empty($data['notes'])) Note::insert($data['notes']);
            if (!empty($data['activity_logs'])) ActivityLog::insert($data['activity_logs']);

            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
            DB::commit();

        } catch (Exception $e) {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
            DB::rollBack();
            throw $e;
        }
    }

    private function formatBytes($bytes, $precision = 2) {
        $units = array('B', 'KB', 'MB', 'GB', 'TB');
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= pow(1024, $pow);
        return round($bytes, $precision) . ' ' . $units[$pow];
    }
}
