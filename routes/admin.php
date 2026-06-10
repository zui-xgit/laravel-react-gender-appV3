<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CaseWorkflowController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified', 'check.role:admin', 'check.status'])->group(function () {
    Route::get('overview', [AdminController::class, 'overview'])->name('admin-overview');
    Route::get('assignments', [AdminController::class, 'personalAssignments'])->name('admin-assignments');
    Route::get('pending', [AdminController::class, 'pending'])->name('admin-pending');
    Route::get('in-progress', [AdminController::class, 'inProgress'])->name('admin-in-progress');
    Route::get('completed', [AdminController::class, 'completed'])->name('admin-completed');


    Route::post("assign-case/{case:uuid}", [AdminController::class, 'assignCase'])->name('admin-assign-case');
    Route::get('view-case/{case:uuid}', [AdminController::class, 'viewCase'])->name("admin-view-case"); 

    Route::get('case-workflow/{case:uuid}', [CaseWorkflowController::class, "caseWorkflow"])->name('admin-case-workflow'); 


    Route::get('staff-management', [AdminController::class, 'staffManagement'])->name("staff.management");
    Route::post('add-staff', [AdminController::class, 'addStaff'])->name('admin.add-staff'); 
    Route::patch('update-staff/{user:uuid}', [AdminController::class, 'updateStaff'])->name('admin.update-staff');
    Route::inertia('adminaudit-logs', 'dashboard/admin/audit-logs')->name("audit.logs"); 

    Route::post('activate-staff/{user:uuid}', [AdminController::class, 'activateStaff'])->name('admin.activate-staff'); 
    Route::post('suspend-staff/{user:uuid}', [AdminController::class, 'suspendStaff'])->name('admin.suspend-staff'); 
    Route::post('deactivate-staff/{user:uuid}', [AdminController::class, 'deactivateStaff'])->name('admin.deactivate-staff'); 
});

