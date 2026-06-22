<?php

namespace App\Http\Controllers;

use App\Models\CaseAssignment;
use App\Models\CaseDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Activitylog\Models\Activity;
use Spatie\LaravelPdf\Facades\Pdf;
use Spatie\LaravelPdf\Enums\Format;

class OfficerController extends Controller      
{
    public function overview()
    {
        $auth_id = Auth::id();

        // 1. Fetch case status counts for cases assigned to this officer
        $statusCounts = CaseAssignment::where('assigned_to', $auth_id)
            ->with('caseDetail')
            ->get()
            ->pluck('caseDetail.status')
            ->countBy();

        $stats = [
            "total_cases" => $statusCounts->sum(),
            'pending'     => $statusCounts->get('pending', 0),
            'in_progress' => $statusCounts->get('in_progress', 0),
            'completed'   => $statusCounts->get('completed', 0),
        ];

        // 2. Fetch recent activity logs for this user
        $logs = Activity::where('causer_id', $auth_id)
            ->with(['causer', 'subject'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($log) {
                return [
                    'log_name'          => $log->log_name,
                    'description'       => $log->description, 
                    'event'             => $log->event, 
                    'causer_name'       => $log->causer 
                        ? ($log->causer->first_name . ' ' . $log->causer->last_name) 
                        : 'System',
                    'causer_roles'      => $log->causer ? $log->causer->getRoleNames() : [],
                    'subject'           => $log->subject, 
                    'subject_type'      => $log->subject_type,
                    'attribute_changes' => $log->attribute_changes, 
                    'properties'        => $log->properties, 
                    'created_at'        => $log->created_at->toIso8601String()
                ];  
            });

        return Inertia::render('dashboard/officer/overview', [
            'stats' => $stats,
            'logs'  => $logs,
        ]);
    }

    public function report(Request $request)    
    {
        $from_date = $request->input('from_date');
        $to_date = $request->input('to_date');
        $summary = null;

        if ($from_date && $to_date) {
            $start = Carbon::parse($from_date)->startOfDay();
            $end = Carbon::parse($to_date)->endOfDay();
            $auth_id = Auth::id();

            $query = CaseDetail::whereBetween('created_at', [$start, $end])
                ->whereHas('caseAssignment', function ($q) use ($auth_id) {
                    $q->where('assigned_to', $auth_id);
                });

            $summary = [
                'total'       => (clone $query)->count(),
                'pending'     => (clone $query)->where('status', 'pending')->count(),
                'in_progress' => (clone $query)->where('status', 'in_progress')->count(),
                'completed'   => (clone $query)->where('status', 'completed')->count(),
            ];
        }

        return Inertia::render('dashboard/officer/report', [
            'summary'   => $summary,
            'from_date' => $from_date,
            'to_date'   => $to_date,
        ]);
    }

    public function dataReport(Request $request)
    {
        ini_set('max_execution_time', 300);
        ini_set('memory_limit', '1G');

        $from_date = $request->query('from_date');
        $to_date = $request->query('to_date');
        $action = $request->query('action');

        $filename = "GVR-Officer-Report-{$from_date}-to-{$to_date}.pdf";

        if (!$from_date || !$to_date) {
            return back()->withErrors(['error' => 'Date range is required for report generation.']);
        }

        $start = Carbon::parse($from_date)->startOfDay();
        $end = Carbon::parse($to_date)->endOfDay();
        $auth_id = Auth::id();

        $cases = CaseDetail::with(['incidentDetail', 'caseAssignment.assignedTo'])
            ->whereBetween('created_at', [$start, $end])
            ->whereHas('caseAssignment', function ($q) use ($auth_id) {
                $q->where('assigned_to', $auth_id);
            })
            ->latest()
            ->get();

        $stats = [
            'total'       => $cases->count(),
            'pending'     => $cases->where('status', 'pending')->count(),
            'in_progress' => $cases->where('status', 'in_progress')->count(),
            'completed'   => $cases->where('status', 'completed')->count(),
            'anonymous'   => $cases->where('is_anonymous', true)->count(),
        ];

        $pdf = Pdf::view('pdfs.report', [
            'cases'       => $cases,
            'stats'       => $stats,
            'fromDate'    => $from_date,
            'toDate'      => $to_date,
            'generatedAt' => now()->format('F j, Y, g:i a'),
            'adminName'   => Auth::user()->first_name . ' ' . Auth::user()->last_name,
        ])->format(Format::A4);

        activity('report-downloaded')
            ->causedBy(Auth::user())
            ->withProperties([
                'ip'          => $request->ip(),
                'userAgent'   => $request->userAgent(),
                'total_cases' => $stats['total']
            ])
            ->log("Downloaded pdf report [ :properties.total_cases case(s) ]");

        if ($action === 'inline') {
            return $pdf->inline($filename);
        }

        if ($action === 'download') {
            return $pdf->name($filename)->download();
        }

        return abort(400, 'Invalid or missing action parameter.');
    }

    public function logs(Request $request)      
    {
        $auth_id = Auth::id();
        $query = Activity::where('causer_id', $auth_id)
            ->with(['causer', 'subject'])
            ->latest();

        if ($request->filled('filter')) {
            $filter = $request->filter;
            if ($filter === 'action') {
                $query->whereNull('event');
            } else {
                $query->where('event', $filter);
            }
        }

        $logs = $query->paginate(20)->withQueryString()->through(function ($log) {
            return [
                'log_name'          => $log->log_name,
                'description'       => $log->description, 
                'event'             => $log->event, 
                'causer_name'       => $log->causer 
                    ? ($log->causer->first_name . ' ' . $log->causer->last_name) 
                    : 'System',
                 'causer_roles'  => $log->causer 
                    ? $log->causer->getRoleNames()
                    : [],
                'subject'           => $log->subject, 
                'subject_type'      => $log->subject_type,
                'attribute_changes' => $log->attribute_changes, 
                'properties'        => $log->properties, 
                'created_at'        => $log->created_at->toIso8601String()
            ];  
        });

        return Inertia::render('dashboard/officer/logs', [
            'logs'    => $logs,
            'filters' => [
                'filter' => $request->query('filter', 'all')
            ],
        ]);
    }


    public function profile()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('roles:name');
        
        $profile = [
            'uuid'              => $user->uuid,
            'roles'             => $user->getRoleNames(),
            'username'          => $user->username,
            'full_name'         => $user->first_name . ' ' . $user->last_name,
            'gender'            => $user->gender,
            'email'             => $user->email,
            'phone'             => $user->phone,
            'status'            => $user->status,
            'email_verified_at' => $user->email_verified_at ? $user->email_verified_at->toIso8601String() : null,
            'last_login_at'     => $user->last_login_at ? $user->last_login_at->toIso8601String() : null,
            'last_logout_at'    => $user->last_logout_at ? $user->last_logout_at->toIso8601String() : null,
            'created_at'        => $user->created_at->toIso8601String(),
            'updated_at'        => $user->updated_at->toIso8601String(),
        ];

        return Inertia::render('dashboard/officer/profile', [
            'profile' => $profile
        ]); 
    }
}

