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
        Schema::create('victim_details', function (Blueprint $table) {
           $table->id();
            $table->foreignIdFor(CaseDetail::class)->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('title', 50);
            $table->enum('sex', ['male', 'female', 'prefer_not_to_say']);
            $table->unsignedTinyInteger('age');
            $table->string('phone', 20);
            $table->string('email');
            $table->string('education');
            $table->string('residence');
            $table->string('disability')->nullable();
            $table->text('workplace');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('victim_details');
    }
};
