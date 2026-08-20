<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class CrmCacheService
{
    /**
     * Default Cache TTL in seconds (15 minutes)
     */
    const CACHE_TTL = 900;

    /**
     * Cache key prefix
     */
    const PREFIX = 'crm_cache_';

    /**
     * Remember dashboard data safely with fallback if Redis or cache fails.
     */
    public static function rememberDashboard(mixed $user, callable $callback)
    {
        $userId = is_object($user) ? $user->id : $user;
        $key = self::PREFIX . 'dashboard_u' . $userId;

        try {
            return Cache::remember($key, self::CACHE_TTL, $callback);
        } catch (\Throwable $e) {
            Log::warning('[CrmCacheService] Cache access failed, falling back to database query: ' . $e->getMessage());
            return $callback();
        }
    }

    /**
     * Remember pending payments data safely with fallback.
     */
    public static function rememberPendingPayments(mixed $user, callable $callback)
    {
        $userId = is_object($user) ? $user->id : $user;
        $key = self::PREFIX . 'pending_payments_u' . $userId;

        try {
            return Cache::remember($key, self::CACHE_TTL, $callback);
        } catch (\Throwable $e) {
            Log::warning('[CrmCacheService] Cache access failed, falling back to database query: ' . $e->getMessage());
            return $callback();
        }
    }

    /**
     * Flush all CRM dashboard and statistics caches.
     */
    public static function flushAllCrmCache(): void
    {
        try {
            // If using Redis or drivers supporting tags or key patterns
            if (config('cache.default') === 'redis') {
                Cache::store('redis')->flush();
            } else {
                Cache::flush();
            }
        } catch (\Throwable $e) {
            Log::warning('[CrmCacheService] Cache flush failed: ' . $e->getMessage());
        }
    }
}
