<?php

use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::inertia('admin', 'dashboard/admin/overview')->name('admin-overview');
    Route::inertia('admin/assignments', 'dashboard/admin/assignments')->name('admin-assignments');
});

