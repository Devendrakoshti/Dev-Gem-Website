<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Client;
use App\Models\BillingItem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // Admin
        User::create([
            'first_name' => 'Admin',
            'last_name' => 'Nexus',
            'email' => 'admin@nexus.com',
            'password' => Hash::make('Admin@123'),
            'role' => 'ADMIN',
            'employee_id' => 'ADM001',
            'status' => 'ACTIVE',
        ]);

        // Employee
        $employee = User::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@nexus.com',
            'password' => Hash::make('John@123'),
            'role' => 'EMPLOYEE',
            'employee_id' => 'EMP001',
            'status' => 'ACTIVE',
        ]);

        // Clients
        $clients = Client::factory(10)->create([
            'assigned_to_id' => $employee->id,
            'created_by_employee_id' => $employee->id,
        ]);

        foreach ($clients as $client) {
            BillingItem::create([
                'client_id' => $client->id,
                'service_name' => 'Web Development',
                'amount_to_collect' => 1000,
                'paid_amount' => 500,
                'remaining_amount' => 500,
                'status' => 'PARTIAL',
                'billing_date' => now(),
                'due_date' => now()->addDays(15),
            ]);
        }
    }
}
