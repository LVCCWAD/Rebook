<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();

        $category = Category::all();

        return view('user.dashboard', compact('user', 'category'));
    }
}
