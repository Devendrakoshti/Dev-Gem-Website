<?php

namespace App\Observers;

use App\Models\Client;
use App\Services\LeadService;

class LeadObserver
{
    public function __construct(protected LeadService $leadService)
    {
    }

    /**
     * Handle the Client "created" event.
     */
    public function created(Client $client): void
    {
        $this->leadService->bustCache($client);
    }

    /**
     * Handle the Client "updated" event.
     */
    public function updated(Client $client): void
    {
        $this->leadService->bustCache($client);
    }

    /**
     * Handle the Client "deleted" event.
     */
    public function deleted(Client $client): void
    {
        $this->leadService->bustCache($client);
    }

    /**
     * Handle the Client "restored" event.
     */
    public function restored(Client $client): void
    {
        $this->leadService->bustCache($client);
    }

    /**
     * Handle the Client "force deleted" event.
     */
    public function forceDeleted(Client $client): void
    {
        $this->leadService->bustCache($client);
    }
}
