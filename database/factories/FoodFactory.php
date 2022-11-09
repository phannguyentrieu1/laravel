<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Food>
 */
class FoodFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $gia = fake()->numberBetween(3, 9) * 100000;
        return [
            'name' => fake()->name(),
            'price' => $gia,
            'sale_price' => $gia - fake()->numberBetween(1, 2) * 10000,
            'category_id' => fake()->numberBetween(1, 3),
            'description' => fake()->paragraph(2),
            'origin' => fake()->paragraph(),
            'standard' => fake()->paragraph(2),
            'image' => fake()->numberBetween(1, 6) . ".jpg"
        ];
    }
}
