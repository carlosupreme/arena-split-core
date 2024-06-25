<?php

use App\Helpers\Logout;
use App\Livewire\Login;
use App\Livewire\Register;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;

Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return view('welcome', [
            'user' => Auth::user()
        ]);
    })->name('home');

    Route::get('/logout', function () {
        call_user_func(new Logout);
        return redirect()->route('login');
    })->name('logout');

});

Route::middleware('guest')->group(function () {
    Route::get('/login', Login::class)->name('login');
    Route::get('/registrarse', Register::class)->name('register');
});

