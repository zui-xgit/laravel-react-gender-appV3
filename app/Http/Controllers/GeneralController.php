<?php

namespace App\Http\Controllers;

use App\Models\CaseAssignment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
}
