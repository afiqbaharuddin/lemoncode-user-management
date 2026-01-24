<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'firstname' => 'Admin',
            'lastname' => 'User',
            'email' => 'admin@lemoncode.com',
            'phone' => '+60123456789',
            'password' => Hash::make('password123'),
            'status' => 'active',
        ]);

        // Create test users
        User::factory()->count(20)->create();
    }
}