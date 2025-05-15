<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <a href="{{route('user.dashboard')}}">Dashboard</a>
    <h1>{{$user->name}}'s cart</h1>
    <h2>Items in Cart</h2>
    @if(!$cart || $cart->products->isEmpty())
        <p>Your cart is empty.</p>
    @else
        @foreach($cart->products as $product)
            <div>
                <h3>{{ $product->name }}</h3>
                <p>Price: {{ $product->price }}</p>
                <p>Quantity: {{ $product->pivot->quantity }}</p>
                <p>Total: {{ $product->price * $product->pivot->quantity }}</p>
                <img src="{{ asset('storage/' . $product->image) }}" alt="Product Image" width="150">
            </div>
            <form action="{{ route('cart.remove', $product->id) }}" method="POST">
                @csrf
                @method('DELETE')
                <button type="submit">Remove from Cart</button>
            </form>
        @endforeach

        <form action="{{route('cart.clear')}}" method="POST">
                @csrf
                @method('DELETE')
                <button type="submit">Clear Cart</button>
        </form>

        <form action="{{route('order.store')}}" method="POST">
            @csrf
            <button type="submit">Checkout</button>
        </form>
    @endif
</body>
</html>
