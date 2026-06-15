<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CaseWorkflowController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified', 'check.roles:admin', 'check.status'])->group(function () {
    Route::get('overview', [AdminController::class, 'overview'])->name('admin.overview');
    Route::get('pending', [AdminController::class, 'pending'])->name('admin.pending');
    Route::get('in-progress', [AdminController::class, 'inProgress'])->name('admin.in-progress');
    Route::get('completed', [AdminController::class, 'completed'])->name('admin.completed');
    Route::get('staff-management', [AdminController::class, 'staffManagement'])->name("admin.staff-management");
    Route::get('report', [AdminController::class, 'report'])->name('admin.report'); 
    Route::get('audit-logs', [AdminController::class, 'auditLogs'])->name("admin.audit-logs"); 


    Route::post("assign-case/{case:uuid}", [AdminController::class, 'assignCase'])->name('admin-assign-case');
    

    Route::post('add-staff', [AdminController::class, 'addStaff'])->name('admin.add-staff'); 
    Route::patch('update-staff/{user:uuid}', [AdminController::class, 'updateStaff'])->name('admin.update-staff');

    Route::post('activate-staff/{user:uuid}', [AdminController::class, 'activateStaff'])->name('admin.activate-staff'); 
    Route::post('suspend-staff/{user:uuid}', [AdminController::class, 'suspendStaff'])->name('admin.suspend-staff'); 
    Route::post('deactivate-staff/{user:uuid}', [AdminController::class, 'deactivateStaff'])->name('admin.deactivate-staff'); 

    Route::get('report/data-report', [AdminController::class, "dataReport"])->name('admin.data-report'); 

});

