<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin User',
                'email' => 'admin@nexus.com',
                'password' => Hash::make('password123'),
                'role' => 'ADMIN',
                'employee_id' => 'ADM001',
                'email_verified_at' => Carbon::now(),
            ],
            [
                'name' => 'Sarah Chen',
                'email' => 'sarah@nexus.com',
                'password' => Hash::make('password123'),
                'role' => 'EMPLOYEE',
                'employee_id' => 'EMP001',
                'email_verified_at' => Carbon::now(),
            ],
            [
                'name' => 'Mike Ross',
                'email' => 'mike@nexus.com',
                'password' => Hash::make('password123'),
                'role' => 'EMPLOYEE',
                'employee_id' => 'EMP002',
                'email_verified_at' => Carbon::now(),
            ],
        ];

        foreach ($users as $userData) {
            User::updateOrCreate(
                ['email' => $userData['email']],
                $userData
            );
        }
    }
}
