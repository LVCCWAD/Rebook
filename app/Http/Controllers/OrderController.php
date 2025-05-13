<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Cart;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function storeOrder(Request $request)
    {
        $user = Auth::user();

        //get the user cart with products
        $cart = Cart::where('user_id', $user->id)->with('products')->first();

        if (!$cart || $cart->products->isEmpty()) {
            return response()->json([
                'message' => 'Cart is empty'
            ]);
        }

        //create the order

        $order = Order::create([
            'user_id' => $user->id,
            'cart_id' => $cart->id,
            'status' => 'pending',
            'total' => $cart->products->sum(function ($product) {
                return $product->price * $product->pivot->quantity;
            }),
        ]);

        //create the order items

        foreach ($cart->products as $product) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $product->pivot->quantity,
                'price' => $product->price,
            ]);
        }

        return redirect()->route('order.show', $order->id)->with('success', 'Order placed successfully.');
    }

    public function showOrder($id)
    {
        $order = Order::with('orderItems.product')->findOrFail($id);

        return view('user.order.order_show', compact('order'));
    }

}
