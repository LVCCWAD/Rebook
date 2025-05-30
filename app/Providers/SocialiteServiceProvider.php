<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\Socialite\SocialiteService;

class SocialiteServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
         $this->app->singleton(SocialiteService::class, function ($app) {
            return new SocialiteService();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
