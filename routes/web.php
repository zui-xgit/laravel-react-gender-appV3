<?php

use App\Http\Controllers\CaseWorkflowController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');


Route::inertia('/test', 'test' )->name("test");



// case - workflow
Route::middleware(['auth', 'verified', 'role:admin,officer'])->group(function () {
    Route::post('admin/case-intake/{case:uuid}', [CaseWorkflowController::class, 'caseIntake'])->name('case-intake');
    Route::post('admin/case-investigate/{case:uuid}', [CaseWorkflowController::class, 'caseInvestigate'])->name('case-investigation');
    Route::post('admin/case-escalate/{case:uuid}', [CaseWorkflowController::class, 'caseEscalate'])->name('case-escalation');
    Route::post('admin/case-resolve/{case:uuid}', [CaseWorkflowController::class, 'caseResolve'])->name('case-resolution');
});


require __DIR__.'/admin.php';
require __DIR__.'/officer.php';
require __DIR__.'/reporter.php';
require __DIR__.'/settings.php';
