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

    public function addToCart(Request $request, $id)
    {
        $user = Auth::user();
        $cart = Cart::firstOrCreate(['user_id' => $user->id]);

        $product = Product::findOrFail($id);
        $requestQuantity = (int)$request->input('quantity');


        $existingItem = $cart->products()->where('product_id', $id)->first();

        $existingQuantity = $existingItem ? $existingItem->pivot->quantity : 0;
        $quantity = $existingQuantity + $requestQuantity;

        if ($quantity > $product->stock) {
            return redirect()->back()->with('error', 'Not enough stock available.');
        }

        if ($quantity <= 0) {
            return redirect()->back()->with('error', 'Quantity must be atleast 1.');
        }

        if($existingItem) {
            $cart->products()->updateExistingPivot($id, [
                'quantity' => $existingItem->pivot->quantity + $quantity
            ]);
        } else {
            $cart->products()->attach($id, [
                'quantity' => $quantity
            ]);
        }

        return redirect()->route('product.show', $id)->with('success', 'Product added to cart successfully.');
    }

    public function updateCart(Request $request, Product $product)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $user = Auth::user();
        $cart = $user->cart;

        //same error handling as in addToCart where the stock shouldn't exceed the available stock
        if ($request->input('quantity') > $product->stock)  {
            return redirect()->back()->with('error', 'Not enough stock available.');
        }

        if ($request->input('quantity') <= 0) {
            return redirect()->back()->with('error', 'Quantity must be atleast 1.');
        }
        //check if the product is in the cart

        if (!$cart || !$cart->products->contains($product->id)) {
            return redirect()->back()->with('error', 'Product not found in cart.');
        }

        $cart->products()->updateExistingPivot($product->id, [
            'quantity' => $request->input('quantity'),
        ]);

        return redirect()->back()->with('success', 'Cart updated successfully.');

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
