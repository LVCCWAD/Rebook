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
    <h1>Category: {{ $category->name }}</h1>
    <h2>Products</h2>
    @if($products->isEmpty())
        <p>No products available in this category.</p>
    @else
    <h2>{{ $category->name }}</h2>
    <ul>
        @foreach ($products as $product)
        <a href="{{route('product.show', $product->id)}}">
            <li>{{ $product->name }} - ₱{{ $product->price }}</li>
        </a>
        @endforeach
    </ul>
    @endif
</body>
</html>
