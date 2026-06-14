<?php

use App\Http\Controllers\CaseWorkflowController;
use App\Http\Controllers\GeneralController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'check.roles:admin,officer', 'check.status'])->group(function () {
    Route::post('case-intake/{case:uuid}', [CaseWorkflowController::class, 'caseIntake'])->name('case-intake');
    Route::post('case-investigate/{case:uuid}', [CaseWorkflowController::class, 'caseInvestigate'])->name('case-investigation');
    Route::post('case-escalate/{case:uuid}', [CaseWorkflowController::class, 'caseEscalate'])->name('case-escalation');
    Route::post('case-resolve/{case:uuid}', [CaseWorkflowController::class, 'caseResolve'])->name('case-resolution');
    // this route is for assignments , since both admin and officer can deal with assignments.
    Route::get('general/assignments', [GeneralController::class, 'assignments'])->name('general.assignments'); 
});
    