<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\Food;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        Category::create(['id' => 1, 'name' => 'Hoa quả']);
        Category::create(['id' => 2, 'name' => 'Rau hữu cơ']);
        Category::create(['id' => 3, 'name' => 'Thực phẩm khô']);

        Food::factory(10)->create();
    }
}
