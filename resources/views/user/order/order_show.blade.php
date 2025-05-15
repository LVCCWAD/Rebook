<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>Order Details</h1>

    <h2>Order #{{$order->id}}</h2>

    <p>Status: {{$order->status}}</p>
    <p>Total: {{$order->total}}</p>
    @if(!$shipping)
        <a href="{{ route('shipping.form') }}">Add Shipping Details</a>
    @else
        <p>Shipping: {{$shipping->city_name}}, {{$shipping->address}}, {{$shipping->zip_code}}, {{$shipping->country}}</p>
    @endif

    <h3>Items</h3>

    @if ($order->orderItems->isEmpty())
        <p>No items in this order.</p>
    @else
        {{-- table --}}
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($order->orderItems as $item)
                    <tr>
                        <td>₱{{$item->product->name}}</td>
                        <td>{{$item->quantity}}</td>
                        <td>{{$item->price}}</td>
                        <td>{{$item->price * $item->quantity}}</td>
                    </tr>

                    {{-- cancel order --}}
                    @if($order->status == 'pending')
                        <form action="{{ route('order.cancel', $order->id) }}" method="POST">
                            @csrf
                            @method('DELETE')
                            <button type="submit">Cancel Order</button>
                        </form>
                    @endif
                @endforeach
            </tbody>
        </table>
        {{-- payment --}}
        @if($order->status == 'pending')
            <form action="{{ route('payment.store', $order->id) }}" method="POST">
                @csrf
                <input type="hidden" name="amount" id="amount" value="{{$order->total}}">
                <button type="submit">Pay Now</button>
            </form>
        @endif
    @endif
</body>
</html>
