<?php

namespace App\Providers;
use Laravel\Horizon\Horizon;
use Illuminate\Support\ServiceProvider;
use Stripe\Stripe;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        /*Horizon::auth(function ($request) {
            return auth()->user()->id == 4;
        });*/
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {

    }
}
