<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Notifications\OrderPlacedNotification;

class ProfileController extends Controller
{
    public function showProfile()
    {
        $user = Auth::user();
        //this will also fetch user's orders
        $orders = Order::where('user_id', $user->id)
        ->with('payment', 'shipping', 'orderItems.product')->get();

        $user->load('shippings');

        return view('user.profile.show', compact('user', 'orders'));
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'image' => $request->file('image') ? $request->file('image')->store('images/users', 'public') : $user->image,
        ]);
        return redirect()->route('user.profile')->with('success', 'Profile updated successfully.');

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
