<?php

use App\Models\CaseDetail;
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
        Schema::create('case_assignments', function (Blueprint $table) {
             $table->id();
            $table->uuid('uuid')->unique(); 


            // $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            
            $table->foreignIdFor(CaseDetail::class)->constrained()->cascadeOnDelete();
            $table->foreignId('assigned_to')->constrained('users')->cascadeOnDelete(); 
            $table->foreignId('assigned_by')->constrained('users')->cascadeOnDelete(); 

            $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
            $table->timestamp('last_updated')->nullable();

            
            
            // Prevent duplicate assignment of the same officer to the same case
            $table->unique(['case_detail_id', 'assigned_to']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('case_assignments');
    }
};
