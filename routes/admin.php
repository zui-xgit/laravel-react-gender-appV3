<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('admin', [AdminController::class, 'overview'])->name('admin-overview');
    Route::get('admin/assignments', [AdminController::class, 'personalAssignments'])->name('admin-assignments');
    Route::get('admin/pending', [AdminController::class, 'pending'])->name('admin-pending');
    Route::get('admin/in-progress', [AdminController::class, 'in_progress'])->name('admin-in-progress');
    Route::get('admin/completed', [AdminController::class, 'completed'])->name('admin-completed');


    Route::post("admin/assign-case/{case:uuid}", [AdminController::class, 'assignCase'])->name('admin-assign-case');
    Route::get('admin/view-case/{case:uuid}', [AdminController::class, 'viewCase'])->name("admin-view-case"); 

    Route::get('admin/case-workflow/{case:uuid}', [AdminController::class, "caseWorkflow"])->name('admin-case-workflow'); 
});

