<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'first_name' => 'System',
            'last_name' => 'Admin',
            'email' => 'admin@nexuscrm.local',
            'employee_id' => 'EMP-001',
            'password' => Hash::make('password'),
            'role' => 'ADMIN',
            'status' => 'ACTIVE',
        ]);

        User::create([
            'first_name' => 'Test',
            'last_name' => 'Employee',
            'email' => 'employee@nexuscrm.local',
            'employee_id' => 'EMP-002',
            'password' => Hash::make('password'),
            'role' => 'EMPLOYEE',
            'status' => 'ACTIVE',
        ]);
    }
}