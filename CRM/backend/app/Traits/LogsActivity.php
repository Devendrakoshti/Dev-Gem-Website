<?php

namespace App\Traits;

use App\Models\ActivityLog;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

trait LogsActivity
{
    protected static function bootLogsActivity()
    {
        foreach (static::getRecordableEvents() as $event) {
            static::$event(function (Model $model) use ($event) {
                $model->logActivity($event);
            });
        }
    }

    protected static function getRecordableEvents(): array
    {
        if (isset(static::$recordableEvents)) {
            return static::$recordableEvents;
        }

        return ['created', 'updated', 'deleted'];
    }

    protected function logActivity(string $event)
    {
        ActivityLog::create([
            'actor_id' => Auth::id(),
            'action' => ucfirst($event),
            'target_id' => $this->id,
            'target_type' => get_class($this),
            'metadata' => $this->getActivityMetadata($event),
        ]);
    }

    protected function getActivityMetadata(string $event): array
    {
        if ($event === 'updated') {
            return [
                'old' => array_intersect_key($this->getOriginal(), $this->getDirty()),
                'new' => $this->getDirty(),
            ];
        }

        return $this->toArray();
    }
}
