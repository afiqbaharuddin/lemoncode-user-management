<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create([
        'firstname' => 'John',
        'lastname' => 'Doe',
        'email' => 'john@example.com',
        'password' => bcrypt('password123'),
        'status' => 'active',
    ]);
});

test('user can login with valid credentials', function () {
    $response = $this->postJson('/api/login', [
        'email' => 'john@example.com',
        'password' => 'password123',
    ]);

    $response->assertStatus(200)
        ->assertJsonStructure([
            'message',
            'access_token',
            'token_type',
            'user' => [
                'id',
                'email',
                'status',
            ]
        ]);
});

test('user cannot login with invalid credentials', function () {
    $response = $this->postJson('/api/login', [
        'email' => 'john@example.com',
        'password' => 'wrongpassword',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['email']);
});

test('inactive user cannot login', function () {
    $this->user->update(['status' => 'inactive']);

    $response = $this->postJson('/api/login', [
        'email' => 'john@example.com',
        'password' => 'password123',
    ]);

    $response->assertStatus(403)
        ->assertJson([
            'message' => 'Your account is inactive. Please contact administrator.',
        ]);
});

test('user can logout', function () {
    $token = $this->user->createToken('auth_token')->plainTextToken;

    $response = $this->withHeader('Authorization', "Bearer {$token}")
        ->postJson('/api/logout');

    $response->assertStatus(200)
        ->assertJson([
            'message' => 'Logged out successfully'
        ]);
});

test('user can get their profile', function () {
    $token = $this->user->createToken('auth_token')->plainTextToken;

    $response = $this->withHeader('Authorization', "Bearer {$token}")
        ->getJson('/api/me');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'user' => [
                'id',
                'firstname',
                'lastname',
                'email',
            ]
        ]);
});