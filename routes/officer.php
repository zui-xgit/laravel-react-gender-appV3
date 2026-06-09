<?php

use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified', 'check.role:officer', 'check.status'])->group(function () {
    Route::inertia('overview', 'dashboard/officer/overview')->name('officer-overview');
});

