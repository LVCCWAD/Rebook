<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Review;
use App\Models\Product;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function viewOneProduct($id)
    {
        $product = Product::findorFail($id);
        $reviews = Review::where('product_id', $id)->with('user')->get();

        return view('user.category.product_show', compact('product', 'reviews'));
    }

    public function storeReview(Request $request, $id)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:255',
        ]);

        //users reviews will be stored in the reviews table
        Review::create([
            'user_id' => Auth::id(),
            'product_id' => $id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return redirect()->back()->with('success', 'Review submitted successfully!');
    }

    public function editReview(Request $request, $id)
    {
        $review = Review::findOrFail($id);
        $review->update([
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return redirect()->back()->with('success', 'Review updated successfully!');
    }

    public function deleteReview($id)
    {
        $review = Review::findOrFail($id);
        $review->delete();

        return redirect()->back()->with('success', 'Review deleted successfully!');
    }
}
