<?php

use App\Http\Controllers\ReporterController;
use Illuminate\Support\Facades\Route;


Route::middleware(['guest'])->group(function () {
    Route::post("reporter", [ReporterController::class, 'store'])->name('report');
    Route::inertia('reporter/report', 'dashboard/reporter/report')->name('reporter-report'); 
    Route::inertia('reporter/track', 'dashboard/reporter/track')->name('reporter-track'); 
});

