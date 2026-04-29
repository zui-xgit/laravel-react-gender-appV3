<?php

namespace Database\Factories;

use App\Models\InformantDetail;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<InformantDetail>
 */
class InformantDetailFactory extends Factory
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
            'title' => fake()->optional()->text(50),
            'sex' => fake()->randomElement(['male', 'female', 'prefer_not_to_say']),
            'age' => fake()->numberBetween(18, 80),
            'phone' => fake()->phoneNumber(),
            'workplace' => fake()->company(),
        ];
    }

    
    /**
     * Make all fields null (for anonymous case)
     */
    public function anonymous(): self
    {
        return $this->state(fn () => [
            'name' => null,
            'title' => null,
            'sex' => null,
            'age' => null,
            'phone' => null,
            'workplace' => null,
        ]);
    }
}
