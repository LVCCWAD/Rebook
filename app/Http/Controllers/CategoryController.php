<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();
        $category = Category::all();

        return view('user.dashboard', compact('user', 'category', 'product'));
    }

    public function categoryShow($id)
    {
        $category = Category::findOrFail($id);
        $products = Product::where('category_id', $id)->get();
        return view('user.category.category_show', compact('category', 'products'));
    }
}
