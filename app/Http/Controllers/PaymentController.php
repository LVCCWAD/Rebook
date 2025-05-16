<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    public function storePayment(Request $request, $id)
    {
        $user = Auth::user();
        $order = Order::where('id', $id)->where('user_id', $user->id)->where('status', 'pending')->first();
        if (!$order) {
            return response()->json(['message' => 'No pending order found'], 404);
        }

        $request->validate([
            'amount' => 'required|numeric',
        ]);

        do
        {
            $transactionId = 'TXN' . Str::random(10);
        } while (Payment::where('transaction_id', $transactionId)->exists());

        $payment = Payment::create([
            'order_id' => $order->id,
            'user_id' => $user->id,
            'amount' => $request->amount,
            'status' => 'completed',
            'transaction_id' => $transactionId,
        ]);

        //update order status to completed
        $order->update([
            'status' => 'completed',
        ]);

        //conditions whether it will be cancelled or not(not required yet)

        return response()->json([
            'message' => 'Payment successful',
            'payment' => $payment,
        ], 201);

    }
}
