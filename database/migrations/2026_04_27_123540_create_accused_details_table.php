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
        Schema::create('accused_details', function (Blueprint $table) {
           $table->id();
            $table->foreignIdFor(CaseDetail::class)->constrained()->onDelete('cascade');
            
            // Kept unencrypted for demographic metrics and case tracking
            $table->enum('sex', ['male', 'female', 'prefer_not_to_say']);
            $table->unsignedTinyInteger('age');
            
            // Converted to text to handle large encrypted strings safely
            $table->text('name');
            $table->text('title'); 
            $table->text('phone');
            $table->text('email');
            $table->text('education');
            $table->text('residence');
            $table->text('workplace');

            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accused_details');
    }
};
