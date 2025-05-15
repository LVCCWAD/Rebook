<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>Shipping Details</h1>
    <form action="{{route('shipping.store')}}" method="POST">
        @csrf
        <div>
            <label for="city_name">City Name: </label>
            <input type="text" name="city_name" id="city_name">>
        </div>
        <div>
            <label for="address">Address: </label>
            <input type="text" name="address" id="address">
        </div>
        <div>
            <label for="postal_code">Postal Code: </label>
            <input type="number" name="zip_code" id="zip_code">
        </div>
        <div>
            <label for="country">Country: </label>
            <input type="text" name="country" id="country">
        </div>
        <button type="submit">Submit</button>
    </form>
</body>
</html>
