<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'mobile' => $this->mobile,
            'company_name' => $this->company_name,
            'company_address' => $this->company_address,
            'email' => $this->email,
            'status' => $this->status,
            'stage' => $this->stage,
            'assigned_to_id' => $this->assigned_to_id,
            'assigned_to' => new UserResource($this->whenLoaded('assignedTo')),
            'created_by_employee_id' => $this->created_by_employee_id,
            'created_by' => new UserResource($this->whenLoaded('createdBy')),
            'is_archived' => $this->is_archived,
            'is_deleted' => $this->is_deleted,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
