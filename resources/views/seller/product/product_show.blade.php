<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>{{$product->name}}</h1>
    <h2>Product Details</h2>
    <p>Price: ₱{{$product->price}}</p>
    <p>Description: {{$product->description}}</p>
    <p>Seller: {{$product->user->name}}</p>
    <p>Stock: {{$product->stock}}</p>
    <p>Category: {{$product->categories->name}}</p>

    <form action="{{route('seller.product.edit', $product->id)}}">
        <button type="submit">Edit Product</button>
    </form>

   <form action="{{route('seller.product.delete', $product->id)}}" method="POST">
        @csrf
        @method('DELETE')
        <button type="submit">Delete Product</button>
    </form>
</body>
</html>
