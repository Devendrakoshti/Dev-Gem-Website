<?php

namespace App\Services;

use App\Models\Client;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class LeadService
{
    /**
     * Get a paginated list of leads with Cache-Aside pattern.
     */
    public function index(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $user = Auth::user();
        $page = request()->get('page', 1);
        $filterStr = json_encode($filters);
        
        // Dynamic Cache Key
        $cacheKey = "user_{$user->id}_leads_page_{$page}_filter_" . md5($filterStr);

        $fetchData = function () use ($filters, $perPage, $user) {
            $query = Client::query()->with(['assignedTo', 'createdBy']);

            if ($user->role !== 'ADMIN') {
                $query->where('assigned_to_id', $user->id);
            }

            if (isset($filters['type'])) {
                switch ($filters['type']) {
                    case 'archived':
                        $query->where('is_archived', true);
                        break;
                    case 'active':
                        $query->active();
                        break;
                    case 'trash':
                        $query->onlyTrashed();
                        break;
                }
            }

            return $query->latest()->paginate($perPage);
        };

        try {
            if (Cache::supportsTags()) {
                return Cache::tags(["user_leads_{$user->id}", "leads"])->remember(
                    $cacheKey,
                    now()->addMinutes(30),
                    $fetchData
                );
            }
        } catch (\Exception $e) {
            // Fail-safe: Graceful fallback
            \Log::error("Cache error in LeadService@index: " . $e->getMessage());
        }

        // Fallback for non-taggable stores or cache failures
        return $fetchData();
    }

    /**
     * Update a lead and invalidate relevant cache.
     */
    public function update(string $id, array $data): Client
    {
        $lead = Client::findOrFail($id);
        $lead->update($data);

        // Explicit cache busting (Cache Invalidation)
        $this->bustCache($lead);

        return $lead;
    }

    /**
     * Clear cache for specific user and global leads pool.
     */
    public function bustCache(Client $lead): void
    {
        try {
            if (Cache::supportsTags()) {
                // Clear all leads cache for the assigned user
                Cache::tags(["user_leads_{$lead->assigned_to_id}"])->flush();
                
                // Also clear global leads tags if necessary
                Cache::tags(["leads"])->flush();
            }
        } catch (\Exception $e) {
            \Log::warning("Could not bust cache: " . $e->getMessage());
        }
    }
}
