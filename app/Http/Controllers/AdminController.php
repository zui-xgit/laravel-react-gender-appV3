<?php

namespace App\Http\Controllers;

use App\Models\CaseAssignment;
use App\Models\CaseDetail;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
    public function personalAssignments(Request $request)
    {

       $auth_id = Auth::id();
       $query = CaseAssignment::with([
            'caseDetail', 
            'assignedBy'
        ])
        ->where('assigned_to', $auth_id)
        ->latest();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('caseDetail', function ($q) use ($search) {
                $q->where('case_tracking_id', 'like', "%{$search}%");
            });
        }

        if ($request->filled('filter')) {
            $query->where('priority', $request->filter);
        }

       $personal_assignments = $query->paginate(15) 
        ->withQueryString()
        ->through(function ($case_assignment) {
            return [
                "caseDetail" => [
                    'uuid' => $case_assignment->caseDetail->uuid,
                    "case_tracking_id" => $case_assignment->caseDetail->case_tracking_id, 
                    "is_anonymous"     => $case_assignment->caseDetail->is_anonymous,
                    "status"           => $case_assignment->caseDetail->status,
                    "caseWorkflowPercentage" => $case_assignment->caseDetail->caseWorkflowPercentage, 
                ], 
                'assignedBy' => [    
                    "assigned_by" => $case_assignment->assignedBy->first_name . ' ' . $case_assignment->assignedBy->last_name,
                    'assigned_by_role'=> $case_assignment->assignedBy->role,   
                ], 
                
                "priority"      => $case_assignment->priority,
                "date_assigned" => $case_assignment->created_at->toIso8601String(),
                "last_updated" => $case_assignment->last_updated
            ];
        });



        return Inertia::render("dashboard/admin/assignments", [
            "assignments" => $personal_assignments,
            "filters" => $request->only(['search', 'filter']),
        ]);
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
    public function assignCase(Request $request, CaseDetail $case)
    {
     
       
        $validated = $request->validate([
            'assigned_to' => 'required|exists:users,uuid',
            'priority'    => 'required|in:low,medium,high,critical',
        ]);


        try{ 



            DB::beginTransaction(); 


            $assigned_to_id = User::where('uuid', $validated['assigned_to'])->value('id'); 
            $assigned_by_id = Auth::id(); 

            $case->caseAssignment()->create([
                    'assigned_to' => $assigned_to_id, 
                    'assigned_by' => $assigned_by_id, 
                    'priority' => $validated['priority']
            ]);


            $case->update([
                'status' => 'in_progress',
            ]);


            DB::commit(); 
            Inertia::flash("message", 'Case Assigned successfully');
            


        }catch(Exception $e){
            dd($e); 
            DB::rollBack(); 
            return back()->withErrors([
                'error' => 'Failed to assign case. Please contact support'
            ]); 
        }

    }

    public function viewCase(Request $request, CaseDetail $case)
    {
        $case->load([
            'incidentDetail',
            'victimDetail',
            'accusedDetail',
            'informantDetail',
            'caseAssignment.assignedTo',
            'caseAssignment.assignedBy',
        ]);

       

        $case->setVisible([
            'uuid',
            'case_tracking_id',
            'is_anonymous',
            'status',
            'created_at',
            'caseAssignment',
            'informantDetail', 
            "victimDetail",
            'accusedDetail', 
            "incidentDetail"

        ]);

        if ($case->caseAssignment) {
            $case->caseAssignment->makeHidden(['id', 'case_detail_id', 'assigned_by', 'assigned_to']);
            $case->caseAssignment->assignedBy?->makeHidden(['id', 'user_name',  'email_verified_at', 'created_at', 'updated_at']);
            $case->caseAssignment->assignedTo?->makeHidden(['id', 'user_name',  'email_verified_at', 'created_at', 'updated_at']);
        }

         $case->informantDetail->makeHidden([
            "id",
            'case_detail_id', 
            'created_at',
            'updated_at'
        ]);

        $case->victimDetail->makeHidden([
             "id",
            'case_detail_id', 
            'created_at',
            'updated_at'
        ]); 
        $case->accusedDetail->makeHidden([
             "id",
            'case_detail_id', 
            'created_at',
            'updated_at'
        ]); 
        $case->incidentDetail->makeHidden([
             "id",
            'case_detail_id', 
            'created_at',
            'updated_at'
        ]); 



        return Inertia::render('dashboard/view-case', [
            'caseData' => $case,
            'from_page' => $request->query('from_page'), 
            'from_url' => $request->query("from_url"), 
        ]);
    }

    public function caseWorkFlow(Request $request, CaseDetail $case)
    {
        $intake_data = $case->caseWorkflow()->where("phase", 'intake')->value('form_data');
        $investigation_data = $case->caseWorkflow()->where("phase", 'investigation')->value('form_data');
        $escalation_data = $case->caseWorkflow()->where("phase", 'escalation')->value('form_data');
        $resolution_data = $case->caseWorkflow()->where("phase", 'resolution')->value('form_data');

       return Inertia::render('dashboard/case-workflow', [
            'case_uuid' => $case->uuid,
            'case_tracking_id' => $case->case_tracking_id,
            'from_page' => $request->query('from_page'), 
            'from_url' => $request->query("from_url"), 

            // Tabs data (if or if not available is handled in the frontend); 
            'intake_data' => $intake_data,
            'investigation_data' => $investigation_data,    
            "escalation_data" => $escalation_data, 
            "resolution_data" => $resolution_data,
            "caseWorkflowPercentage" => $case->caseWorkflowPercentage
            
       ]); 
    }

    // in_progress
    public function inProgress(Request $request)
    {
        $query = CaseDetail::with(['incidentDetail', 'caseAssignment'])
            ->where('status', 'in_progress')
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

        $cases = $query->paginate(10)->withQueryString()->through(function ($case) {
            return [
                'uuid' => $case->uuid,
                'case_tracking_id' => $case->case_tracking_id,
                'is_anonymous' => (bool) $case->is_anonymous,
                'status' => $case->status,
                'created_at' => $case->created_at->toIso8601String(),
                "caseWorkflowPercentage" => $case->caseWorkflowPercentage, 
                'case_assignment' => [
                    'priority' => $case->caseAssignment->priority, 
                    'case_assigned_at' => $case->caseAssignment->created_at->toIso8601String(),
                    'assigned_to' => $case->caseAssignment->assignedTo->first_name . ' ' . $case->caseAssignment->assignedTo->last_name, 
                    'assigned_to_role' => $case->caseAssignment->assignedTo->role,
                    'assigned_by' => $case->caseAssignment->assignedBy->first_name . ' ' . $case->caseAssignment->assignedBy->last_name,
                    'assigned_by_role' => $case->caseAssignment->assignedBy->role
                ]
            ];
        });

        $stats = [
            'total' => CaseDetail::where('status', 'in_progress')->count(),
            'identified' => CaseDetail::where('status', 'in_progress')->where('is_anonymous', false)->count(),
            'anonymous' => CaseDetail::where('status', 'in_progress')->where('is_anonymous', true)->count(),
        ];

        return Inertia::render('dashboard/admin/in-progress', [
            'cases' => $cases,
            'stats' => $stats,
            'filters' => $request->only(['search', 'filter']),
        ]);
    }

    // completed
    public function completed(Request $request)
    {
        $query = CaseDetail::with(['caseAssignment', "incidentDetail"])   
            ->where('status', 'completed')
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

        $cases = $query->paginate(10)->withQueryString()->through(function ($case) {
            return [
                'uuid' => $case->uuid,
                'case_tracking_id' => $case->case_tracking_id,
                'is_anonymous' => (bool) $case->is_anonymous,
                'status' => $case->status,
                'case_reported_at' => $case->created_at->toIso8601String(),
                'incident_detail' => [
                    'incident_type' => $case->incidentDetail->incident_type,
                ],
                'caseAssignment' => [
                    'case_assigned_at' => $case->caseAssignment->created_at->toIso8601String(),
                    'assigned_by' => $case->caseAssignment->assignedBy->first_name . ' ' . $case->caseAssignment->assignedBy->last_name, 
                    'assigned_by_role' => $case->caseAssignment->assignedBy->role, 
                    'assigned_to' => $case->caseAssignment->assignedTo->first_name . ' ' . $case->caseAssignment->assignedTo->last_name, 
                    'assigned_to_role' => $case->caseAssignment->assignedTo->role
                ]
            ];
        });

        $stats = [
            'total' => CaseDetail::where('status', 'completed')->count(),
            'identified' => CaseDetail::where('status', 'completed')->where('is_anonymous', false)->count(),
            'anonymous' => CaseDetail::where('status', 'completed')->where('is_anonymous', true)->count(),
            'today' => CaseDetail::where('status', 'completed')->whereDate('created_at', now()->toDateString())->count(),
        ];

        return Inertia::render('dashboard/admin/completed', [
            'cases' => $cases,
            'stats' => $stats,
            'filters' => $request->only(['search', 'filter']),
        ]);
    }

    // staff management
    public function staffManagement(){}

    // audit logset
    public function auditLogs(){}

    // settings
    public function settings(){}

    
}
