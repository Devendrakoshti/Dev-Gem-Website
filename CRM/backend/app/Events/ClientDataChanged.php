<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ClientDataChanged implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public string $action;
    public mixed $clientData;

    /**
     * Create a new event instance.
     *
     * @param string $action (e.g. 'created', 'updated', 'deleted', 'restored', 'transferred')
     * @param mixed $clientData
     */
    public function __construct(string $action, mixed $clientData)
    {
        $this->action = $action;
        $this->clientData = $clientData;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('crm-updates'),
        ];
    }

    /**
     * The event's broadcast name.
     */
    public function broadcastAs(): string
    {
        return 'ClientDataChanged';
    }
}
