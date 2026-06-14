<?php

use App\Http\Controllers\OfficerController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified', 'check.roles:officer', 'check.status'])->group(function () {
    Route::get('overview', [OfficerController::class, 'overview'])->name('officer.overview');
    Route::get('report', [OfficerController::class, 'report'])->name('officer.report'); 
    Route::get('logs', [OfficerController::class, 'logs'])->name('officer.logs'); 
});

