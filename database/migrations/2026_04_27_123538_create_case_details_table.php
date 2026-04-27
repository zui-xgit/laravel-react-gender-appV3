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
        Schema::create('case_details', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique(); 
            
            $table->string('case_tracking_id', 20)->unique();
            $table->boolean('is_anonymous');
            $table->enum('status', ['unassigned', 'assigned', "in_progress",  'resolved'])->default('unassigned');
            $table->timestamps();
            // TODO: need to understand what softDeletes does. i need to learn more about it. 
            $table->softDeletes(); 
            // In Laravel, $table->softDeletes(); is a feature that allows you to "delete" a record without actually removing it from your database.
            // Instead of a permanent DELETE query, Laravel adds a special column called deleted_at to your table. When you "delete" a model, Laravel simply fills that column with the current timestamp.
            
            // Indexes for better query performance
            $table->index('case_tracking_id');
            $table->index('status');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('case_details');
    }
};
