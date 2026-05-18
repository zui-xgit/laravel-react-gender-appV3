<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->nullable(); 
            // Role
            $table->enum('role', ['admin', 'officer'])->required();


            // Basic Identity
            $table->string('username')->unique();  // login user name
            $table->string('first_name');
            $table->string('last_name');
            $table->enum('gender', ['male', 'female']);

            // Contact and personal information
            $table->string('email')->nullable();
            $table->string('phone', 20);

            // Authentication
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');


            // Management fields
            $table->enum('status', ['active', 'inactive', 'suspended'])->default("active");
            // $table->string('department')->nullable(); 
            // $table->string('staff_id')->nullable()->unique(); // For MUHAS staff/students
            $table->timestamp('last_login_at')->nullable();


            $table->rememberToken();  // this is managed by laravel 
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
