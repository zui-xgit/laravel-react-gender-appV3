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
            
            // Kept unencrypted for filtering, sorting, and aggregate analytics
            $table->date('incident_date');
            $table->time('incident_time');
            $table->string('incident_type'); 

            // Converted to text/longText to handle large encrypted strings safely
            $table->text('location');
            $table->text('exact_location');
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
