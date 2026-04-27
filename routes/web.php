<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');



require __DIR__.'/admin.php';
require __DIR__.'/officer.php';
require __DIR__.'/reporter.php';
require __DIR__.'/settings.php';
