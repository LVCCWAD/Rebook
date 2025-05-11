<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ShopController extends Controller
{
    public function shopCreate()
    {
        return view('seller.shop_create');
    }

    public function shopStore(Request $request)
    {
        $request->validate([
            'shop_name' => 'required|string|max:255|unique:shops',
            'description' => 'nullable|string|max:1000',
        ]);

        Shop::create([
            'seller_id' => Auth::id(),
            'shop_name' => $request->shop_name,
            'description' => $request->description,
        ]);

        return redirect()->route('shop.dashboard')->with('success', 'Shop created successfully.');
    }

    public function shopDashboard()
    {
        $products = Product::where('seller_id', Auth::id())->get();
        $shop = Shop::where('seller_id', Auth::id())->first();
        $categories = Category::all();

        return view('seller.shop_dashboard', compact('shop', 'products', 'categories'));
    }
}
