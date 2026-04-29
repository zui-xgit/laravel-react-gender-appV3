<?php

namespace Database\Factories;

use App\Models\AccusedDetail;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AccusedDetail>
 */
class AccusedDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
         return [
            'name' => fake()->name(),
            'title' => substr(fake()->jobTitle(), 0, 50), // max 50 chars
            'sex' => fake()->randomElement(['male', 'female', 'prefer_not_to_say']),
            'age' => fake()->numberBetween(18, 80),
            'phone' => substr(fake()->phoneNumber(), 0, 20), // max 20 chars
            'email' => fake()->unique()->safeEmail(),
            'education' => substr(fake()->word(), 0, 50),
            'residence' => substr(fake()->city(), 0, 50),
            'workplace' => fake()->company(), // text column, no limit
        ];
    }
}
