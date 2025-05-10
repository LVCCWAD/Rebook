<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>Create a Product</h1>
    <form action="{{ route('product.store') }}" method="POST">
        @csrf
        <div>
            <label for="name">Product Name: </label>
            <input type="text" id="name" name="name" required>
        </div>
        <div>
            <label for="description">Description: </label>
            <textarea id="description" name="description" required></textarea>
        </div>
        <div>
            <label for="price">Price:</label>
            <input type="number" id="price" name="price" required>
        </div>
        <div>
            <label for="category_id">Category: </label>
            <select id="category_id" name="category_id">
                @foreach ($categories as $category)
                    <option value="{{ $category->id }}">{{ $category->name }}</option>
                @endforeach
            </select>
        </div>
        <div>
            <label for="stock">Stock: </label>
            <input type="number" id="stock" name="stock" required>
        </div>
        <button type="submit">Create Product</button>
</body>
</html>
