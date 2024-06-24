<?php

use App\Livewire\Register;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return Auth::user();
    })->name('home');
});

Route::middleware('guest')->group(function () {
    Route::get('/login', Register::class)->name('login');
    Route::get('/registrarse', Register::class)->name('register');
});

