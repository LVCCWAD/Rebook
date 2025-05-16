<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>Shop Create</h1>
    <form action="{{ route('shop.store') }}" method="POST">
        @csrf
        <div>
            <label for="name">Shop Name: </label>
            <input type="text" id="shop_name" name="shop_name" required>
        </div>
        <button type="submit">Create Shop</button>
    </form>

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
</body>
</html>
