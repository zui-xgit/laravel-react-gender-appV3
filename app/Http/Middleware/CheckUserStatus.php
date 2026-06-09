<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckUserStatus
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if(Auth::check()){
            $user = Auth::user(); 


            if($user->status === 'suspended'){
                  Auth::logout();
                  $request->session()->invalidate();
                  $request->session()->regenerateToken();
                  return redirect()->route('suspended');
            }

            if($user->status === 'inactive'){
                  return redirect()->route('inactive');
            }

            if($user->status === 'active'){
                  return $next($request);	
            }
        }
            
        return $next($request);
    }
}
