<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\User;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{

    public function viewCart($id)
    {
        $cart = Cart::where('user_id', $id)->with('products')->first();
        $user = User::findOrFail($id);

        return view('user.cart.cart_view', compact('cart', 'user'));
    }

    public function addToCart($id)
    {
        $user = Auth::user();
        $cart = Cart::firstOrCreate(['user_id' => $user->id]);

        $existingItem = $cart->products()->where('product_id', $id)->first();

        if($existingItem) {
            $cart->products()->updateExistingPivot($id, [
                'quantity' => $existingItem->pivot->quantity + 1
            ]);
        } else {
            $cart->products()->attach($id, [
                'quantity' => 1
            ]);
        }

        return redirect()->route('product.show', $id)->with('success', 'Product added to cart successfully.');
    }

    public function updateCart(Request $request, $id)
    {

    }

    public function removeFromCart($id)
    {
        $user = Auth::user();
        $cart = Cart::where('user_id', $user->id)->first();

        if($cart) {
            $cart->products()->detach($id);
            return redirect()->back()->with('success', 'Product removed from cart successfully.');
        }

        return redirect()->back()->with('error', 'Cart not found.');
    }

    public function clearCart()
    {
        $user = Auth::user();
        $cart = Cart::where('user_id', $user->id)->first();

        if($cart) {
            $cart->products()->detach();
            return redirect()->back()->with('success', 'Cart cleared successfully.');
        }

        return redirect()->back()->with('error', 'Cart not found.');
    }
}
