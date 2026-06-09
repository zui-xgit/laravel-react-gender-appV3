<?php

namespace App\Listeners;

use App\Models\User;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use Illuminate\Events\Dispatcher;
use Illuminate\Support\Carbon;

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
        ];
    }
}