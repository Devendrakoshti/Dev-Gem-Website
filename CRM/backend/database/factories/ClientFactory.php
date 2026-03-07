<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'mobile' => $this->faker->phoneNumber(),
            'company_name' => $this->faker->company(),
            'company_address' => $this->faker->address(),
            'email' => $this->faker->unique()->safeEmail(),
            'status' => 'ACTIVE',
            'stage' => 'NEW',
            'is_archived' => false,
            'is_deleted' => false,
        ];
    }
}
