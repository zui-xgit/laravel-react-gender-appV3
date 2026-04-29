<?php

use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified', 'role:officer'])->group(function () {
    Route::inertia('officer', 'dashboard/officer/overview')->name('officer-overview');
});

