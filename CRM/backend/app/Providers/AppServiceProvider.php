<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Event;
use App\Models\User;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::define('admin', function (User $user) {
            return $user->role === 'ADMIN';
        });

        \App\Models\Client::observe(\App\Observers\LeadObserver::class);

        // Register cache invalidation listeners for real-time events
        Event::listen(\App\Events\ClientDataChanged::class, \App\Listeners\InvalidateCrmCache::class);
        Event::listen(\App\Events\PaymentRecorded::class, \App\Listeners\InvalidateCrmCache::class);
        Event::listen(\App\Events\ActivityLoggedEvent::class, \App\Listeners\InvalidateCrmCache::class);
    }
}
