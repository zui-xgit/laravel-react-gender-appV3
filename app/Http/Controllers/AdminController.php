<?php

namespace App\Http\Controllers;

use App\Models\CaseDetail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{

    // overview
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


    // peresonal assignment
    public function personalAssignments()
    {
        return Inertia::render("dashboard/admin/assignments");
    }

    // pending
    public function pending(Request $request)
    {
        $query = CaseDetail::with('incidentDetail')
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc');





        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('case_tracking_id', 'like', "%{$search}%")
                    ->orWhereHas('incidentDetail', function ($iq) use ($search) {
                        $iq->where('incident_type', 'like', "%{$search}%");
                    });
            });
        }

        if ($request->filled('filter')) {
            if ($request->filter === 'anonymous') {
                $query->where('is_anonymous', true);
            } elseif ($request->filter === 'identified') {
                $query->where('is_anonymous', false);
            }
        }

        // mapping the data that i want
        $cases = $query->paginate(10)->withQueryString()->through(function ($case){
              return [
                    'uuid' => $case->uuid,
                    'case_tracking_id' => $case->case_tracking_id,
                    'is_anonymous' => (bool) $case->is_anonymous,
                    'status' => $case->status,
                    'created_at' => $case->created_at->toIso8601String(), 
                    'incident_detail' =>[
                        'incident_type' => $case->incidentDetail->incident_type,
                    ], 
              ];
        });


        $stats = [
            'total' => CaseDetail::where('status', 'pending')->count(),
            'identified' => CaseDetail::where('status', 'pending')->where('is_anonymous', false)->count(),
            'anonymous' => CaseDetail::where('status', 'pending')->where('is_anonymous', true)->count(),
            'today' => CaseDetail::where('status', 'pending')->whereDate('created_at', now()->toDateString())->count(),
        ];

        return Inertia::render('dashboard/admin/pending', [
            'cases' => $cases,
            'stats' => $stats,
            'filters' => $request->only(['search', 'filter']),
        ]);
    }

    // in_progress
    public function in_progress(){
        return Inertia::render('dashboard/admin/in-progress');
    }

    // completed
    public function completed(){
        return Inertia::render('dashboard/admin/completed');
    }

    // staff management
    public function staffManagement(){}

    // audit logs
    public function auditLogs(){}

    // settings
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
