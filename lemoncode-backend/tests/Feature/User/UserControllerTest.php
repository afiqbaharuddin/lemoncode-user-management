<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->admin = User::factory()->create([
        'firstname' => 'Admin',
        'lastname' => 'User',
        'email' => 'admin@example.com',
        'password' => bcrypt('password123'),
        'status' => 'active',
    ]);
    
    $this->token = $this->admin->createToken('auth_token')->plainTextToken;
});

test('can list users with pagination', function () {
    User::factory()->count(15)->create();

    $response = $this->withHeader('Authorization', "Bearer {$this->token}")
        ->getJson('/api/users?per_page=10');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'current_page',
            'data' => [
                '*' => [
                    'id',
                    'firstname',
                    'lastname',
                    'email',
                    'phone',
                    'status',
                ]
            ],
            'total',
            'per_page',
        ]);
});

test('can search users by name', function () {
    User::factory()->create([
        'firstname' => 'Alice',
        'lastname' => 'Smith',
        'email' => 'alice@example.com',
    ]);

    $response = $this->withHeader('Authorization', "Bearer {$this->token}")
        ->getJson('/api/users?search=Alice');

    $response->assertStatus(200)
        ->assertJsonFragment(['firstname' => 'Alice']);
});

test('can search users by email', function () {
    User::factory()->create([
        'firstname' => 'Bob',
        'lastname' => 'Johnson',
        'email' => 'bob@test.com',
    ]);

    $response = $this->withHeader('Authorization', "Bearer {$this->token}")
        ->getJson('/api/users?search=bob@test');

    $response->assertStatus(200)
        ->assertJsonFragment(['email' => 'bob@test.com']);
});

test('can create a new user', function () {
    $userData = [
        'firstname' => 'Jane',
        'lastname' => 'Doe',
        'email' => 'jane@example.com',
        'phone' => '1234567890',
        'password' => 'password123',
        'status' => 'active',
    ];

    $response = $this->withHeader('Authorization', "Bearer {$this->token}")
        ->postJson('/api/users', $userData);

    $response->assertStatus(201)
        ->assertJson([
            'message' => 'User created successfully',
            'user' => [
                'firstname' => 'Jane',
                'lastname' => 'Doe',
                'email' => 'jane@example.com',
            ]
        ]);

    $this->assertDatabaseHas('users', [
        'email' => 'jane@example.com',
    ]);
});

test('cannot create user with duplicate email', function () {
    $userData = [
        'firstname' => 'Test',
        'lastname' => 'User',
        'email' => 'admin@example.com',
        'password' => 'password123',
        'status' => 'active',
    ];

    $response = $this->withHeader('Authorization', "Bearer {$this->token}")
        ->postJson('/api/users', $userData);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['email']);
});

test('can show a user', function () {
    $user = User::factory()->create();

    $response = $this->withHeader('Authorization', "Bearer {$this->token}")
        ->getJson("/api/users/{$user->id}");

    $response->assertStatus(200)
        ->assertJsonFragment([
            'id' => $user->id,
            'email' => $user->email,
        ]);
});

test('can update a user', function () {
    $user = User::factory()->create();

    $updateData = [
        'firstname' => 'Updated',
        'lastname' => 'Name',
        'email' => $user->email,
        'phone' => '9876543210',
        'status' => 'inactive',
    ];

    $response = $this->withHeader('Authorization', "Bearer {$this->token}")
        ->putJson("/api/users/{$user->id}", $updateData);

    $response->assertStatus(200)
        ->assertJson([
            'message' => 'User updated successfully',
            'user' => [
                'firstname' => 'Updated',
                'lastname' => 'Name',
            ]
        ]);

    $this->assertDatabaseHas('users', [
        'id' => $user->id,
        'firstname' => 'Updated',
    ]);
});

test('can update user password', function () {
    $user = User::factory()->create();

    $updateData = [
        'firstname' => $user->firstname,
        'lastname' => $user->lastname,
        'email' => $user->email,
        'password' => 'newpassword123',
        'status' => 'active',
    ];

    $response = $this->withHeader('Authorization', "Bearer {$this->token}")
        ->putJson("/api/users/{$user->id}", $updateData);

    $response->assertStatus(200);

    $user->refresh();
    $this->assertTrue(\Hash::check('newpassword123', $user->password));
});

test('can delete a user', function () {
    $user = User::factory()->create();

    $response = $this->withHeader('Authorization', "Bearer {$this->token}")
        ->deleteJson("/api/users/{$user->id}");

    $response->assertStatus(200)
        ->assertJson([
            'message' => 'User deleted successfully'
        ]);

    $this->assertDatabaseMissing('users', [
        'id' => $user->id,
    ]);
});

test('unauthenticated users cannot access user endpoints', function () {
    $response = $this->getJson('/api/users');
    $response->assertStatus(401);
});