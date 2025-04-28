<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="{{ route('user.become_seller.post') }}" method="POST">
        @csrf
        <input type="hidden" name="role" value="seller">

        <div class="mb-3">
            <p>Are you sure you want to become a seller?</p>
        </div>

        <button type="submit" class="btn btn-success">
            Confirm Become Seller
        </button>
    </form>
</body>
</html>
