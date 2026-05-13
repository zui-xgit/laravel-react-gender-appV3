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
        Schema::create('case_workflow_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('case_detail_id')->constrained()->onDelete('cascade');
            $table->enum('phase', ['intake', 'investigation', 'escalation', 'resolution']);
            $table->json('form_data');
            $table->foreignId('completed_by')->constrained('users')->onDelete('cascade');
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
    
            $table->index(['case_detail_id', 'phase']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('case_workflow_data');
    }
};
