<?php

namespace App\Listeners;

use App\Models\User;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use Illuminate\Events\Dispatcher;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class UserEventSubscriber
{
    /**
     * Handle user login events.
     */
    public function handleUserLogin(Login $event): void {


        /** @var User $user */
        $user = $event->user;   

        if ($user) {
            $user->timestamps = false; // Stop updated_at from changing
            $user->update([
                'last_login_at' => Carbon::now(),
            ]);
        }

        // activity log (log in)
        activity("auth")
        ->causedBy($user)
        ->event('login')
        ->withProperties([
            'ip' => request()->ip(), 
            'userAgent' => request()->userAgent()
        ])
        ->log('User logged in');


    }

    public function handleUserLogout(Logout $event): void {


        /** @var User $user */
        $user = $event->user;   

        if ($user) {
            $user->timestamps = false;
            $user->update([
                'last_logout_at' => Carbon::now(),
            ]);
        }


        
        // activity log (log out) 
        activity('auth')
        ->causedBy($user)
        ->event('logout')
        ->withProperties([
            'ip' => request()->ip(), 
            'userAgent' => request()->userAgent()
        ])
        ->log('User logged out');
            
    }


    /**
     * Register the listeners for the subscriber.
     *
     * @return array<string, string>
     */
    public function subscribe(Dispatcher $events): array
    {
        return [
            Login::class => 'handleUserLogin',
            Logout::class => 'handleUserLogout'
        ];
    }
}