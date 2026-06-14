<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OfficerController extends Controller
{
    public function overview()
    {
       return Inertia::render('dashboard/officer/overview') ;
    }
    
    public function report(Request $request)
    {
        return Inertia::render('dashboard/officer/report') ;
    }
    
    public function logs(Request $request)
    {
        return Inertia::render('dashboard/officer/logs') ;
    }
}
