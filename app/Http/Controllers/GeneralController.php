<?php

namespace App\Http\Controllers;

use App\Models\CaseAssignment;
use App\Models\CaseDetail;
use App\Models\CaseEvidence;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GeneralController extends Controller
{
    

    public function assignments(Request $request) 
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
                // "last_updated" => $case_assignment->last_updated
            ];
        });



        return Inertia::render("dashboard/general/assignments", [
            "assignments" => $personal_assignments,
            "filters" => $request->only(['search', 'filter']),
        ]);
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
            'caseEvidence'
        ]);

        // 2. Map out the clean, structured data array
        $caseDetailPayload = [
            'uuid' => $case->uuid, 
            'case_tracking_id' => $case->case_tracking_id, 
            'is_anonymous' => (bool)$case->is_anonymous, 
            'status' => $case->status,
            'created_at' => $case->created_at->toIso8601String(),


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
            ])->toArray() : [],

            'case_evidence' => $case->caseEvidence->map(function ($evidence) {
                return [
                    'uuid' => $evidence->uuid, 
                    'file_name' => $evidence->file_name,
                    'file_type' => $evidence->file_type,
                    // 'file_path' => asset('storage/app/public/' . $evidence->file_path),
                    'created_at' => $evidence->created_at->toIso8601String(),
                ];
            }),
        ];

        
        $all_users = User::query()->latest()->get()->map(function ($user ){
            return [
                 'uuid' => $user->uuid,
                 'first_name' => $user->first_name,
                 'last_name' => $user->last_name,
                 'role' => $user->role,
            ];
        });

        // 3. Render page with Inertia passing the structured data
        return Inertia::render('dashboard/view-case', [
            'case_detail' => $caseDetailPayload,
            'from_page'   => $request->query('from_page'), 
            'from_url'    => $request->query('from_url'), 
            'all_users'   => $all_users
        ]);
    }

    public function downloadFile(CaseEvidence $file) 
    {
        return Storage::download($file->file_path, $file->file_name); 
    }
}
