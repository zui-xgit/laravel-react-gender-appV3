<?php

use App\Http\Controllers\CaseWorkflowController;
use App\Http\Controllers\ReporterController;
use Illuminate\Support\Facades\Route;
// use Laravel\Fortify\Features;

Route::inertia('/', 'welcome')->name('home');

Route::inertia('/test', 'test' )->name("test");


// Route::middleware(['guest'])->group(function () {
    Route::post("reporter", [ReporterController::class, 'store'])->name('reporter');
    Route::inertia('reporter/report', 'reporter/report')->name('reporter-report'); 
    Route::inertia('reporter/track', 'reporter/track')->name('reporter-track'); 
    Route::inertia('reporter/success', 'reporter/success')->name('reporter-success'); 
    Route::inertia('faq', 'reporter/faq')->name('faq');
    Route::inertia('education', 'reporter/education')->name('education');
// });



// case - workflow
Route::middleware(['auth', 'verified', 'role:admin,officer'])->group(function () {
    Route::post('admin/case-intake/{case:uuid}', [CaseWorkflowController::class, 'caseIntake'])->name('case-intake');
    Route::post('admin/case-investigate/{case:uuid}', [CaseWorkflowController::class, 'caseInvestigate'])->name('case-investigation');
    Route::post('admin/case-escalate/{case:uuid}', [CaseWorkflowController::class, 'caseEscalate'])->name('case-escalation');
    Route::post('admin/case-resolve/{case:uuid}', [CaseWorkflowController::class, 'caseResolve'])->name('case-resolution');
});


require __DIR__.'/admin.php';
require __DIR__.'/officer.php';
require __DIR__.'/settings.php';
