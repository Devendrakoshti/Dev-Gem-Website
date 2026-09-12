<?php

namespace App\Listeners;

use App\Services\CrmCacheService;
use Illuminate\Support\Facades\Log;

class InvalidateCrmCache
{
    /**
     * Handle any CRM data change event by flushing the relevant caches.
     *
     * This listener is designed to be attached to:
     * - App\Events\ClientDataChanged
     * - App\Events\PaymentRecorded
     * - App\Events\ActivityLoggedEvent
     */
    public function handle(object $event): void
    {
        try {
            CrmCacheService::flushAllCrmCache();
            Log::debug('[InvalidateCrmCache] Cache invalidated due to: ' . get_class($event));
        } catch (\Throwable $e) {
            Log::warning('[InvalidateCrmCache] Failed to invalidate cache: ' . $e->getMessage());
        }
    }
}
