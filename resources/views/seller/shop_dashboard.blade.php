<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>{{Auth::user()->name}}'s Shop</h1>
    <h1>{{$shop->shop_name}}</h1>

    <h2>Products</h2>
    @if($products->isEmpty())
        <a href="{{route('product.create')}}">Create Product</a>
    @else
        <ul>
            @foreach($products as $product)
                <li>
                    <h3>{{ $product->name }}</h3>
                    <p>{{ $product->description }}</p>
                    <p>Price: {{ $product->price }}</p>
                    <p>Stock: {{ $product->stock }}</p>
                    <p>Category: {{ $product->categories->name }}</p>
                </li>
            @endforeach
        </ul>
        <a href="{{route('product.create')}}">Create Product</a>
    @endif

</body>
</html>
