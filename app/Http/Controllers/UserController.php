<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

use App\Models\Review;
use App\Models\Shipping;
use App\Models\Shop;
use Illuminate\Support\Facades\Log;



class UserController extends Controller
{
    public function registerForm()
    {
        return view('user.register');
        // return Inertia::render('Auth/Register');
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => [
                'required',
                'string',
                'min:8',
                'regex:/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).+$/',
                'confirmed',
            ],
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ], [
            'password.regex' => 'Password must include letters, numbers, and special characters',
            'password.confirmed' => 'Passwords do not match',
        ]);

Log::info('show request ---------->', $request->all());

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'image' => $request->file('image') ? $request->file('image')->store('images/users', 'public') : null,
            'password' => Hash::make($request->password),
            'role' => $request->input('role', 'user'), // Default role is 'user'
        ]);

        Auth::login($user);
        return redirect()
            ->route('user.dashboard')
            ->with('success', 'User registered successfully.');
    }

    public function loginForm()
    {
        return view('user.login');
        // return Inertia::render('Auth/Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {

             return redirect()->route('user.dashboard')->with('success', 'Logged in successfully.');

            // return redirect()
            //     ->route('user.dashboard')
            //     ->with('success', 'Logged in successfully.');

        }



      // Check if user with that email exists
    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return back()->withErrors([
            'email' => 'Invalid email address.',
        ]);
    }

    // If user exists, check password
    if (!Hash::check($request->password, $user->password)) {
        return back()->withErrors([
            'password' => 'Incorrect password.',
        ]);
    }

    // Fallback (should not normally reach here)
    return back()->withErrors([
        'login' => 'Login failed. Please check your credentials.',
    ]);


        // return back()->withErrors(['error' => 'backend validation error']);
        // return redirect()->back()->with('error', 'Invalid credentials.');
    }

    public function dashboard(Request $request)
    {
        $user = Auth::user();
        $categories = Category::all();
        $product = Product::all();

        return view('user.dashboard', compact('user', 'categories'));

        $unreadNotifications = $user->unreadNotifications;
        $unreadNotifications->markAsRead();

        $notifications = $user->notifications()->latest()->take(10)->get();

        return view('user.dashboard', compact('user', 'categories', 'notifications', 'unreadNotifications'));

        // if ($request->has('category_id')){
        //     $product = Product::where('category_id', $request->category_id)->get();
        // } else {
        //     $product = Product::all();
        // }

        // return Inertia::render('Dashboard/Dashboard', [
        //     'user' => $user,
        //     'categories' => $categories,
        //     'products' => $product,
        // ]);
    }

    public function becomeSellerView()
    {
        return view('user.become_seller');


    //   $user = Auth::user();



    //     // Ensure user is a seller
    //     if (!$user->isSeller()) {
    //         abort(403, 'Unauthorized');
    //     }

    //     // Get products sold by this seller (via shop)
    //     $products = Product::where('seller_id', $user->id)->pluck('id');

    //     // Get all order items that include the seller's products
    //     $orderItems = OrderItem::whereIn('product_id', $products)
    //         ->with(['order', 'product'])
    //         ->get();

    //     // Extract unique orders
    //     $orders = $orderItems->pluck('order')->unique('id')->values();

    //     // Pass data to Inertia
    //     return Inertia::render('Seller/Seller', [
    //         'user' => $user,
    //         'orders' => $orders,
    //         'products' => $products,
    //     ]);
    }

    public function becomeSeller(Request $request)
    {

        $user = Auth::user();

        User::where('id', $user->id)->update(['role' => 'seller']);

        // return redirect()->route('shop.create')->with('success', 'You are now a seller.');
        return redirect()->route('user.become_seller');
    }


    public function logout()
    {
        Auth::logout();
        return redirect()->route('login')->with('success', 'Logged out successfully.');
    }


    // --- React Test ---
    public function test(){
        $carts = Cart::all();
        $cartItems = CartItem::all();
        $categories = Category::all();
        $orders = Order::all();
        $orderItems = OrderItem::all();
        $payments = Payment::all();
        $products = Product::all();
        $reviews = Review::all();
        $shippings = Shipping::all();
        $shops = Shop::all();
        $users = User::all();

        return Inertia::render('ReactTest/ReactTest', [
            'carts' => $carts,
            'categories' => $categories,
            'cartItems' => $cartItems,
            'orders' => $orders,
            'orderItems' => $orderItems,
            'payments' => $payments,
            'products' => $products,
            'reviews' => $reviews,
            'shippings' => $shippings,
            'shops' => $shops,
            'users' => $users,
        ]);
    }
}

