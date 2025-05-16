<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Business Analytics</title>
</head>
<body>
    <h1>{{ $shop->shop_name }} - Business Analytics</h1>
    <p>Seller: {{ Auth::user()->name }}</p>
    <a href="{{ route('shop.dashboard') }}">Back to Shop Dashboard</a>

    <hr>

    <h2>Total Earnings: ₱{{ number_format($totalEarnings, 2) }}</h2>

    <hr>

    <h3>Order Items Sold</h3>

    @if ($orderItems->isEmpty())
        <p>No completed or cancelled paid orders yet.</p>
    @else
        <table border="1" cellpadding="8" cellspacing="0">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Buyer</th>
                    <th>Status</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                    <th>Shipping</th>
                    <th>Payment ID</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($orderItems as $item)
                    <tr>
                        <td>{{ $item->product->name }}</td>
                        <td>{{ $item->order->users->name }}</td>
                        <td>{{ ucfirst($item->order->status) }}</td>
                        <td>{{ $item->quantity }}</td>
                        <td>₱{{ $item->price }}</td>
                        <td>₱{{ $item->price * $item->quantity }}</td>
                        <td>
                            @if ($item->order->shipping)
                                {{ $item->order->shipping->city_name }},
                                {{ $item->order->shipping->address }},
                                {{ $item->order->shipping->zip_code }},
                                {{ $item->order->shipping->country }}
                            @else
                                No Shipping Info
                            @endif
                        </td>
                        <td>
                            {{ $item->order->payment->transaction_id ?? 'Unpaid' }}
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endif

</body>
</html>
