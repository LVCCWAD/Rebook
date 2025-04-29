<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SellerController extends Controller
{
    public function sellerView()
    {
        $user = Auth::user();
        if ($user->role !== 'seller') {
            return redirect()->route('user.dashboard')->with('error', 'You are not authorized to access this page.');
        }
        return view('seller.seller-dashboard');
    }
}
