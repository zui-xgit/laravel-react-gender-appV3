<?php

namespace Database\Factories;

use App\Models\IncidentDetail;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<IncidentDetail>
 */
class IncidentDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
         return [
            'date' => fake()->date('Y-m-d', '2026-12-31'),
            'time' => fake()->time('H:i:s'),
            'location' => substr(fake()->city(), 0, 255), // string field
            'exact_location' => fake()->address(),
            'cause' => fake()->sentence(6),
            'description' => fake()->paragraphs(3, true), // longText
            'actions_taken' => fake()->paragraph(2, true),
            'injuries' => fake()->sentence(6),
            'assistance_needed' => fake()->sentence(6),
            'other_involved' => fake()->sentence(6),
        ];
    }
}
