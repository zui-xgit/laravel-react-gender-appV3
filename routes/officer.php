<?php

use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified', 'role:officer'])->group(function () {
    Route::inertia('officer', 'dashboard/officer-dashboard')->name('officer-dashboard');
});

