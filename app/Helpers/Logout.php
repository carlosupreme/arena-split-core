<?php

namespace App\Helpers;


use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class Logout
{
    public function __invoke(): void
    {
        Auth::logout();
        Session::invalidate();
        Session::regenerateToken();
    }
}
