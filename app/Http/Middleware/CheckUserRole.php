<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {

                  
          if (!$request->user()) {
              abort(403, 'Unauthorized access');
          }

          // Check if the user's role is in the list of permitted roles
          if (!in_array($request->user()->role, $roles)) {
              abort(403, 'Unauthorized access');
          }

          return $next($request);
    }
}
