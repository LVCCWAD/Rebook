<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // react route test

        // Register the new admin route file
        Route::middleware('web') // or 'api' depending on the use case
            ->group(base_path('routes/reactRoute.php'));
    }
}
