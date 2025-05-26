<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $shop->shop_name }} - Seller Dashboard</title>
</head>
<body>

    {{-- Navigation --}}
    <a href="{{ route('user.dashboard') }}">Back to Dashboard</a>

    {{-- Shop Info --}}
    <h1>{{ Auth::user()->name }}'s Shop</h1>
    <h2>{{ $shop->shop_name }}</h2>

    {{-- Categories --}}
    <h3>Categories</h3>
    <ul>
        @foreach ($categories as $category)
            <li>{{ $category->name }}</li>
        @endforeach
    </ul>

    <hr>

    {{-- Products --}}
    <h2>My Products</h2>
    @if($products->isEmpty())
        <p>You have no products yet.</p>
        <a href="{{ route('product.create') }}">Create Product</a>
    @else
        <ul>
            @foreach($products as $product)
                <li>
                    <a href="{{ route('seller.product.show', $product->id) }}">
                        {{ $product->name }} - ₱{{ $product->price }}
                    </a>
                </li>
            @endforeach
        </ul>
        <a href="{{ route('product.create') }}">Create More Products</a>
    @endif

    <hr>

    {{-- Orders --}}
    <h2>Orders Details</h2>
    @if ($orderItems->isEmpty())
        <p>No orders found for your products yet.</p>
    @else
        <table border="1" cellpadding="10">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Transaction ID</th>
                    <th>Shipping Address</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($orderItems as $item)
                    <tr>
                        <td>{{ $item->order->id }}</td>
                        <td>{{ $item->order->users->name }}</td>
                        <td>{{ $item->product->name }}</td>
                        <td>{{ $item->quantity }}</td>
                        <td>{{ $item->order->status }}</td>
                        <td>{{ $item->order->payment->transaction_id ?? 'N/A' }}</td>
                        <td>
                            @if ($item->order->shipping)
                                {{ $item->order->shipping->address }},
                                {{ $item->order->shipping->city_name }},
                                {{ $item->order->shipping->zip_code }},
                                {{ $item->order->shipping->country }}
                            @else
                                Not set
                            @endif
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endif
    <a href="{{route('shop.analytics')}}">Business Analytics</a>
</body>
</html>
