<?php

namespace App\Http\Controllers;

use App\Models\CaseDetail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{

    public function overview()
{
    // 1. Fetch only the 'status' column from the database as a Collection
    // We use toBase() to avoid hydrating full Eloquent models, saving memory.
    $statusCounts = CaseDetail::toBase()
        ->select('status')
        ->get()
        ->countBy('status');
    
    // 2. Consolidate all stats into a single array
    // This provides a clean, predictable structure for your React props.
    $stats = [
        "total_cases" => $statusCounts->sum(),
        'pending'     => $statusCounts->get('pending', 0),
        'in_progress' => $statusCounts->get('in_progress', 0),
        'completed'   => $statusCounts->get('completed', 0),
    ];

    // 3. Render the view via Inertia
    return Inertia::render("dashboard/admin/overview", [
         "stats" => $stats
    ]); 
}


    public function personalAssignments()
    {
        return Inertia::render("dashboard/admin/assignments");
    }
    public function pending() {
        return Inertia::render('dashboard/admin/pending');
    }
    public function in_progress(){
        return Inertia::render('dashboard/admin/in-progress');
    }
    public function completed(){
        return Inertia::render('dashboard/admin/completed');
    }
    public function staffManagement(){}
    public function auditLogs(){}
    public function settings(){}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
