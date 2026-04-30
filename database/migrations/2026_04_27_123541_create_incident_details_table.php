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
        Schema::create('incident_details', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(CaseDetail::class)->constrained()->onDelete('cascade');
            $table->date('date');
            $table->time('time');
            $table->string('location');
            $table->text('exact_location');
            $table->string('incident_type');
            $table->text('cause');
            $table->longText('description');
            $table->text('actions_taken');
            $table->text('injuries');
            $table->text('assistance_needed');
            $table->text('other_involved');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incident_details');
    }
};
