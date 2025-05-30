<?php
namespace App\Services\Socialite;

use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Contracts\User as ProviderUser;

class SocialiteService
{
    public function redirectToProvider(string $provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function handleProviderCallback(string $provider): ProviderUser
    {
        return Socialite::driver($provider)->user();
    }
}
