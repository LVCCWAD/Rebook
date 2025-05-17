<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Details</title>
</head>
<body>
    <h1>Order Details</h1>
    <h2>#{{ $order->id }}</h2>
    <p>Status: {{ $order->status }}</p>
    <p>Total: ₱{{ $order->total }}</p>

    {{-- Payment Status --}}
    @if($order->payment && $order->payment->transaction_id)
        <p>Transaction Id: {{ $order->payment->transaction_id }}</p>
    @else
        <p>Payment: Not paid</p>
    @endif

    {{-- Shipping Address --}}
    @if($order->shipping)
        <p>Shipping:
            {{ $order->shipping->address }},
            {{ $order->shipping->city_name }},
            {{ $order->shipping->zip_code }},
            {{ $order->shipping->country }}
        </p>
    @else
        {{-- Select Shipping if not assigned --}}
        @if($shippings->isNotEmpty())
            <h4>Select a Shipping Address:</h4>
            <form action="{{ route('order.shipping.store', $order->id) }}" method="POST">
                @csrf
                <select name="shipping_id" required>
                    @foreach($shippings as $ship)
                        <option value="{{ $ship->id }}">
                            {{ $ship->address }}, {{ $ship->city_name }}, {{ $ship->zip_code }}, {{ $ship->country }}
                        </option>
                    @endforeach
                </select>
                <button type="submit">Use This Address</button>
                <a href="{{ route('shipping.form') }}">Add Shipping Details</a>
            </form>
        @else
            <a href="{{ route('shipping.form') }}">Add Shipping Details</a>
        @endif
    @endif

    <hr>

    {{-- Items --}}
    @if ($order->orderItems->isEmpty())
        <p>No items in this order.</p>
    @else
        <table border="1" cellpadding="10">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($order->orderItems as $item)
                    <tr>
                        <td>
                            <img src="{{ asset('storage/' . $item->product->image) }}" alt="Product Image" width="100">
                        </td>
                        <td>{{ $item->product->name }}</td>
                        <td>{{ $item->quantity }}</td>
                        <td>₱{{ $item->price }}</td>
                        <td>₱{{ $item->price * $item->quantity }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endif

    <br>

    {{-- Action Buttons --}}
    @if ($order->status === 'pending')
        {{-- Cancel Order --}}
        <form action="{{ route('order.cancel', $order->id) }}" method="POST" style="display: inline;">
            @csrf
            @method('DELETE')
            <button type="submit">Cancel Order</button>
        </form>

        {{-- Pay Now --}}
        @if ($order->shipping)
            <form action="{{ route('payment.store', $order->id) }}" method="POST" style="display: inline;">
                @csrf
                <input type="hidden" name="amount" value="{{ $order->total }}">
                <button type="submit">Pay Now</button>
            </form>
        @else
            <p style="color: red;">Please select a shipping address to proceed with payment.</p>
        @endif
    @elseif ($order->status === 'completed' && $order->payment)
        {{-- Cancel Payment (record cancelled payment) --}}
        <form action="{{ route('payment.cancelled', $order->id) }}" method="POST">
            @csrf
            <input type="hidden" name="amount" value="{{ $order->payment->amount }}">
            <button type="submit">Cancel Payment</button>
        </form>
    @endif

</body>
</html>
