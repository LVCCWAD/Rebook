<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class EventServiceProvide extends ServiceProvider
{
    protected $listen = [
    \App\Events\OrderPlaced::class => [
        \App\Listeners\SendOrderConfirmationNotification::class,
    ],
    ];
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
