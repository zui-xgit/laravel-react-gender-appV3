<?php

use App\Http\Controllers\CaseWorkflowController;
use App\Http\Controllers\GeneralController;
use App\Http\Controllers\ReporterController;
use App\Models\CaseDetail;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
// use Laravel\Fortify\Features;

Route::inertia('/', 'welcome')->name('home');

Route::inertia('/test', 'test' )->name("test");


// Route::middleware(['guest'])->group(function () {
    Route::post("reporter", [ReporterController::class, 'store'])->name('reporter');

    // Route::get('reporter/case-reported-successfully', function (){
    //     return Inertia::render('reporter/case-reported-successfully');  
    // })->name('case-reported-successfully')->middleware('has.tracking'); 

    Route::inertia('reporter/case-reported-successfully', 'reporter/case-reported-successfully')
        ->name('case-reported-successfully')->middleware('has.tracking');
    Route::inertia('reporter/report', 'reporter/report')->name('reporter-report'); 
    Route::inertia('reporter/track', 'reporter/track')->name('reporter-track'); 
    Route::inertia('reporter/success', 'reporter/success')->name('reporter-success'); 
    Route::inertia('faq', 'reporter/faq')->name('faq');
    Route::inertia('education', 'reporter/education')->name('education');
    Route::inertia('suspended', 'suspended')->name('suspended'); 
    Route::get('track-case', [ReporterController::class, 'trackCase'])->name('track-case'); 


// });



Route::prefix('admin')->group(function (){
    require __DIR__.'/admin.php';
}); 

Route::prefix('officer')->group(function (){
    require __DIR__.'/officer.php';
});
require __DIR__.'/general.php';
require __DIR__.'/settings.php';
