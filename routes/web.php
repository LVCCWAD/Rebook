<?php

use Illuminate\Support\Facades\Route;


// BACKEND
use App\Http\Controllers\UserController;
use App\Http\Controllers\SellerController;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware(['guest'])->group(function () {
    Route::get('/register', [UserController::class, 'registerForm'])->name('user.register');
    Route::post('/register', [UserController::class, 'register'])->name('user.register.post');
    Route::get('/login', [UserController::class, 'loginForm'])->name('user.login');
    Route::post('/login', [UserController::class, 'login'])->name('user.login.post');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [UserController::class, 'dashboard'])->name('user.dashboard');
    Route::post('/logout', [UserController::class, 'logout'])->name('user.logout');

    Route::get('/become-a-seller', [UserController::class, 'becomeSellerView'])->name('user.become_seller');
    Route::post('/become-a-seller', [UserController::class, 'becomeSeller'])->name('user.become_seller.post');
});

Route::middleware(['auth', 'seller'])->group(function () {
    Route::get('/seller-dashboard', [SellerController::class, 'sellerView'])->name('seller.dashboard');
});


