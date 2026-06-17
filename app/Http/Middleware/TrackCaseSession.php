<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackCaseSession
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $trackingId = $request->session()->get('case_tracking_id');
        $expiresAt = $request->session()->get('case_session_expires_at');

        // Check if session data exists and if the current time exceeds the allowed timestamp
        if (!$trackingId || !$expiresAt || now()->timestamp > $expiresAt) {
            
            // Clean up any remaining partial session data
            $request->session()->forget(['case_tracking_id', 'case_session_expires_at']);

            abort(403, 'Your secure case tracking session has expired.');
        }
        return $next($request);
    }
}
