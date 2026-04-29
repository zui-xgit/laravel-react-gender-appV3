<?php

namespace Database\Factories;

use App\Models\CaseDetail;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<CaseDetail>
 */
class CaseDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $date = fake()
            ->dateTimeBetween('2026-01-01', '2026-12-31')
            ->format('Y-m-d');

        return [
            'case_tracking_id' => sprintf(
                'PS-%s-%s',
                $date,
                strtoupper(Str::random(5))
            ),
            'is_anonymous' => fake()->boolean(), // ✅ random true / false
            'status' => "unassigned",
            // 'status' => fake()->randomElement([
            //     'unassigned', 'assigned', 'resolved'
            // ]),
        ];
    }
}
