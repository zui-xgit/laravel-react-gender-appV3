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
         Schema::create('informant_details', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(CaseDetail::class)->constrained()->onDelete('cascade');
            
            $table->text('name')->nullable();
            $table->text('title')->nullable(); // Expanded from string(50) for encryption overhead

            // Kept unencrypted for demographic reporting/metrics
            $table->enum('sex', ['male', 'female', 'prefer_not_to_say'])->nullable();
            $table->unsignedTinyInteger('age')->nullable();
            
            // Converted to text to handle large encrypted strings safely
            $table->text('phone')->nullable();
            $table->text('workplace')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('informant_details');
    }
};
