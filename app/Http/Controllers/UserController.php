<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function registerForm()
    {
        return view('user.register');
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->input('role', 'user'), // Default role is 'user'
        ]);

        Auth::login($user);
        return redirect()->route('user.dashboard')->with('success', 'User registered successfully.');
    }


    public function loginForm()
    {
        return view('user.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            // Authentication passed...
            return redirect()->route('user.dashboard')->with('success', 'Logged in successfully.');
        }
        return redirect()->back()->with('error', 'Invalid credentials.');
    }

    public function dashboard()
    {
        $user = Auth::user();
        return view('user.dashboard', compact('user'));
    }

    public function becomeSellerView()
    {
        return view('user.become_seller');
    }

    public function becomeSeller(Request $request)
    {
        $request->validate([
            'role' => 'required|in:seller',
        ]);

        $user = Auth::user();
        $user->update([
            'role' => $request->role,
        ]);
        return redirect()->route('user.dashboard')->with('success', 'You are now a seller.');
    }


    public function logout()
    {
        Auth::logout();
        return redirect()->route('user.login')->with('success', 'Logged out successfully.');
    }
}
