<?php

namespace App\Http\Controllers;

use App\Notifications\OrderPlacedNotification;
use App\Models\Cart;
use App\Models\Order;
use App\Models\User;
use App\Models\Shipping;
use App\Models\OrderItem;
use Illuminate\Http\Request;
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
        $shipping = Shipping::where('user_id', Auth::id())->first();
        $order = Order::with('orderItems.product')->findOrFail($id);

        return view('user.order.order_show', compact('order', 'shipping'));
    }

    public function cancelOrder($id)
    {
        $order = Order::findOrFail($id);
        $order->status = 'cancelled';
        $order->save();

        return redirect()->route('user.dashboard')->with('success', 'Order cancelled successfully.');
    }

    public function placeOrder(Request $request){

        //Validate and Create Order
        $order = Order::create([
            'user_id' =>Auth::id(),
            'total' => $request->input('total'),
        ]);

        //Notify the User
        $user = Auth::user();
        if ($user) {
            \Illuminate\Support\Facades\Notification::send($user, new OrderPlacedNotification($order));
        }

        return redirect()->route('order.show', $order->id)
                         ->with('success', 'Order placed successfully!');
        
    }


}
