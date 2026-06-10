<?php

namespace App\Http\Controllers;

use App\Models\CaseAssignment;
use App\Models\CaseDetail;
use App\Models\User;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
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

        $all_users = User::query()->latest()->get()->map(function ($user ){
            return [
                 'uuid' => $user->uuid,
                 'first_name' => $user->first_name,
                 'last_name' => $user->last_name,
                 'role' => $user->role,
            ];
        }); 



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
            'all_users' => $all_users,
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

            Inertia::flash('toast', ['type' => 'success', 'message' => __('Case Assigned successfully')]);

            


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

        // 2. Map out the clean, structured data array
        $caseDetailPayload = [
            'uuid' => $case->uuid, 
            'case_tracking_id' => $case->case_tracking_id, 
            'is_anonymous' => (bool)$case->is_anonymous, 
            'status' => $case->status,
            'case_reported_at' => $case->created_at->toIso8601String(),


            'case_assignment' => $case->caseAssignment ? [
                 'assigned_by' => [
                        'first_name' => $case->caseAssignment->assignedBy?->first_name,
                        'last_name'  => $case->caseAssignment->assignedBy?->last_name,
                        'role'       => $case->caseAssignment->assignedBy?->role,
                    ],
                    'assigned_to' => [ 
                         'first_name' => $case->caseAssignment->assignedTo?->first_name,
                        'last_name'  => $case->caseAssignment->assignedTo?->last_name,
                        'role' =>$case->caseAssignment->assignedTo?->role,
                ],
                'priority' => $case->caseAssignment->priority,
            ] : null, 

            'informant_detail' => $case->informantDetail ? $case->informantDetail->makeHidden([
                'id', 'case_detail_id', 'created_at', 'updated_at'
            ])->toArray() : [], 

            'victim_detail' => $case->victimDetail ? $case->victimDetail->makeHidden([
                'id', 'case_detail_id', 'created_at', 'updated_at'
            ])->toArray() : [],

            'accused_detail' => $case->accusedDetail ? $case->accusedDetail->makeHidden([
                'id', 'case_detail_id', 'created_at', 'updated_at'
            ])->toArray() : [],

            'incident_detail' => $case->incidentDetail ? $case->incidentDetail->makeHidden([
                'id', 'case_detail_id', 'created_at', 'updated_at'
            ])->toArray() : []
        ];

        // 3. Render page with Inertia passing the structured data
        return Inertia::render('dashboard/view-case', [
            'case_detail' => $caseDetailPayload,
            'from_page'   => $request->query('from_page'), 
            'from_url'    => $request->query('from_url'), 
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
                'updated_at' => $case->updated_at->toIso8601String(), 
                'incident_detail' => [
                    'incident_type' => $case->incidentDetail->incident_type,
                ],
                'case_assignment' => [
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
    public function staffManagement(Request $request)
    {
        $query = User::query();

        // Filter by search (name, email, username)
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%");
            });
        }

        // Filter by role
        if ($request->filled('role')) {
            $query->where('role', $request->role);
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Fetch staff members with relevant fields
        $staff_members = $query->latest()
            ->get()
            ->map(fn($user) => [
                'uuid' => $user->uuid,
                'username' => $user->username,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'gender' => $user->gender, 
                'email' => $user->email,
                'phone' => $user->phone,
                'role' => $user->role,
                'status' => $user->status,
                'last_login_at' => $user->last_login_at ? $user->last_login_at->toIso8601String() : null,
                'last_logout_at' => $user->last_logout_at ? $user->last_logout_at->toIso8601String() : null,
            ]);

        // Calculate statistics for the dashboard
        $stats = [
            'total' => User::count(),
            'admins' => User::where('role', 'admin')->count(),
            'officers' => User::where('role', 'officer')->count(),
            'suspended' => User::where('status', 'suspended')->count(),
        ];

        return Inertia::render('dashboard/admin/staff-management', [
            'staff_members' => $staff_members,
            'stats' => $stats,
            'filters' => $request->only(['search', 'role', 'status']),
        ]);
    }

    public function addStaff(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => 'required|in:male,female',
            'username' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z0-9]+ \.[a-zA-Z0-9]+$/x', Rule::unique(User::class)],
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|max:20',
            'role' => 'required|in:admin,officer',
            'password' => 'required|string|min:8|confirmed',

            
        ], [
            'username.regex' => 'The username must be in the format "prefix.suffix" (e.g., "john.doe").',
        ]);

        try {
            DB::beginTransaction();

            User::create([
                ...$validated,
                'password' => Hash::make($validated['password']),
            ]);


            DB::commit(); 
            Inertia::flash('toast', ['type' => 'success', 'message' => __('Staff member added successfully')]);
            return back(); 

        }catch(Exception $e){
            DB::rollBack(); 
            return back()->withErrors([
                'error' => 'Failed to add staff member. Please contact support'
            ]);
        }
    }

    public function updateStaff(User $user, Request $request){
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => 'required|in:male,female',
            'username' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z0-9]+ \.[a-zA-Z0-9]+$/x', Rule::unique(User::class)->ignore($user->id)],
            'email' => ['required' , 'email', Rule::unique(User::class)->ignore($user->id)],
            'phone' => 'required|string|max:20',
            'role' => 'required|in:admin,officer',
            'password' => 'required|string|min:8|confirmed',    

            
        ], [
            'username.regex' => 'The username must be in the format "prefix.suffix" (e.g., "john.doe").',
        ]);


        try{
           DB::beginTransaction();

            $user->update([
                ...$validated,
                'password' => Hash::make($validated['password']),
            ]);
           
           DB::commit(); 
           Inertia::flash('toast', ['type' => 'success', 'message' => __('Staff member updated successfully')]);
           return back(); 
        }catch(Exception $e){
            DB::rollBack(); 
            return back()->withErrors([
                'error' => 'Failed to update staff member. Please contact support'
            ]);
        }
    }

    public function activateStaff(User $user) : RedirectResponse
    {
        //  dd('activated staff' . $user->uuid);

         $user->update([
            'status' => 'active'
         ]); 


          Inertia::flash('toast', ['type' => 'success', 'message' => __('Staff Activated successfully')]);
          return back(); 
         
    }

    public function suspendStaff(User $user)
    {
        // dd('suspended staff' . $user->uuid);


        $user->update([
            'status' => 'suspended'
        ]); 

        

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Staff Suspended successfully')]);
        return back(); 
    }

    public function deactivateStaff(User $user)
    {  
         $user->update([
            'status' => 'inactive'
         ]); 

          Inertia::flash('toast', ['type' => 'success', 'message' => __('Staff Deactivated successfully')]);
          return back(); 


    }


    // audit logset
    public function auditLogs(){}

    // settings
    public function settings(){}

    
}
