<?php

use Illuminate\Support\Facades\Route;


// BACKEND
use App\Http\Controllers\ShopController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SellerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ReviewController;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware(['guest'])->group(function () {
    //login and register
    Route::get('/register', [UserController::class, 'registerForm'])->name('user.register');
    Route::post('/register', [UserController::class, 'register'])->name('user.register.post');

    Route::get('/login', [UserController::class, 'loginForm'])->name('login');
    Route::post('/login', [UserController::class, 'login'])->name('user.login.post');
});

Route::middleware(['auth'])->group(function () {
    //dashboard for users
    Route::get('/dashboard', [UserController::class, 'dashboard'])->name('user.dashboard');
    Route::post('/logout', [UserController::class, 'logout'])->name('user.logout');

    //option for becoming a seller
    Route::get('/become-a-seller', [UserController::class, 'becomeSellerView'])->name('user.become_seller');
    Route::post('/become-a-seller', [UserController::class, 'becomeSeller'])->name('user.become_seller.post');

    //category to show products
    Route::get('/categories/{id}', [CategoryController::class, 'categoryShow'])->name('category.show');

    //product show and review
    Route::get('/product/{id}', [ReviewController::class, 'viewOneProduct'])->name('product.show');

    //product review
    Route::post('/product/{id}/review', [ReviewController::class, 'storeReview'])->name('product.review.store');
    Route::post('/product/{id}/review/edit', [ReviewController::class, 'editReview'])->name('product.review.edit');
});

Route::middleware(['auth', 'seller'])->group(function () {
    //initial stage on creating a shop
    Route::get('/create-shop', [ShopController::class, 'shopCreate'])->name('shop.create');
    Route::post('/create-shop', [ShopController::class, 'shopStore'])->name('shop.store');

    //shop overview of the seller
    Route::get('/shop/dashboard/', [ShopController::class, 'shopDashboard'])->name('shop.dashboard');

    //product management
    Route::get('/shop/create-product', [ProductController::class, 'productCreate'])->name('product.create');
    Route::post('/shop/create-product', [ProductController::class, 'productStore'])->name('product.store');
});



