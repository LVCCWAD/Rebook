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
    <h1>{{Auth::user()->name}}'s Shop</h1>
    <h1>{{$shop->shop_name}}</h1>

    <h2>Products</h2>
    @if($products->isEmpty())
        <p>You have no products yet</p>
        <a href="{{route('product.create')}}">Create Product</a>
    @else
        <ul>
            @foreach($products as $product)
                <a href="{{route('seller.product.show', $product->id)}}">
                    <li>{{$product->name}} - ₱{{$product->price}}</li>
                </a>
            @endforeach
        </ul>
        <a href="{{route('product.create')}}">Create Product</a>
    @endif

</body>
</html>
