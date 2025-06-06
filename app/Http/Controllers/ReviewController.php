<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Review;
use App\Models\Product;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use inertia\Inertia;

class ReviewController extends Controller
{
    public function viewOneProduct($id)
    {
        $user = Auth::user();
        $product = Product::findOrFail($id);

        // If $product->image exists, prepend 'storage/' so URL points to public/storage folder
        if ($product->image) {
            $product->image_url = asset('storage/' . $product->image);
        } else {
            $product->image_url = null; // or a default image URL if you want
        }

        $reviews = Review::where('product_id', $id)->with('user')->get();

         // Check if user has already ordered this product
        $hasOrdered = false;
        $hasReviewed = false;

        if ($user) {
            // Check if user has ordered this product (assuming you have Order and OrderItem models)
            $hasOrdered = DB::table('orders')
                ->join('order_items', 'orders.id', '=', 'order_items.order_id')
                ->where('orders.user_id', $user->id)
                ->where('order_items.product_id', $id)
                ->exists();

            // Also check if user has already reviewed this product
            $hasReviewed = Review::where('product_id', $id)
                ->where('user_id', $user->id)
                ->exists();
        }

        return inertia('Product/Product', [
            'product' => $product,
            'reviews' => $reviews,
            'user' => $user,
            'hasOrdered' => $hasOrdered,
            'hasReviewed' => $hasReviewed,
            'canReview' => $user && $hasOrdered && !$hasReviewed,
        ]);
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
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        $review = Review::findOrFail($id);

        if ($review->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

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

    public function image($filename){
        $path = "images/".$filename;
        if(!Storage::exists($path)) {
            abort(404);
        }

        return response(Storage::get($path), 200)
        ->headers("content-Type", Storage::mimeType($path));
    }
}
