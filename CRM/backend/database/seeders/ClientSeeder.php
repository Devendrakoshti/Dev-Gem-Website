<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Client;
use App\Models\User;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $sarah = User::where('email', 'sarah@nexus.com')->first();
        $mike = User::where('email', 'mike@nexus.com')->first();

        if (!$sarah || !$mike) {
            return;
        }

        $clients = [
            [
                'name' => 'John Smith',
                'mobile' => '123-456-7890',
                'company_name' => 'Tech Innovations LLC',
                'company_address' => '123 Silicon Valley, CA',
                'email' => 'john@techinn.com',
                'status' => 'ACTIVE',
                'stage' => 'NEW',
                'assigned_to_id' => $sarah->id,
                'assigned_to_name' => $sarah->name,
                'created_by_employee_id' => $sarah->id,
                'is_archived' => false,
                'created_at' => '2023-10-01 10:00:00'
            ],
            [
                'name' => 'Alice Johnson',
                'mobile' => '987-654-3210',
                'company_name' => 'Global Logistics',
                'company_address' => '456 Harbor Dr, NY',
                'email' => 'alice@gl-log.com',
                'status' => 'ACTIVE',
                'stage' => 'CONTACTED',
                'assigned_to_id' => $sarah->id,
                'assigned_to_name' => $sarah->name,
                'created_by_employee_id' => $sarah->id,
                'is_archived' => false,
                'created_at' => '2023-11-15 14:30:00'
            ],
            [
                'name' => 'Robert Brown',
                'mobile' => '555-010-9988',
                'company_name' => 'Creative Designs',
                'company_address' => '789 Studio Lane, London',
                'email' => 'rob@creative.uk',
                'status' => 'INACTIVE',
                'stage' => 'LOST',
                'assigned_to_id' => $mike->id,
                'assigned_to_name' => $mike->name,
                'created_by_employee_id' => $mike->id,
                'is_archived' => true,
                'created_at' => '2023-05-20 09:00:00'
            ],
        ];

        foreach ($clients as $clientData) {
            Client::firstOrCreate(
                ['email' => $clientData['email']],
                $clientData
            );
        }
    }
}
