<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <header>
        <h1>Re:Book</h1>
        <p>Welcome, {{ Auth::user()->name }}</p>
    </header>

    <main>
        <h1>Dashboard</h1>
        @if ($user->role === 'user')
            <a href="{{route('user.become_seller')}}">
                <p>Start Selling</p>
            </a>
        @elseif ($user->role === 'seller')
            <a href="{{route('seller.dashboard')}}">
                <p>Seller View</p>
            </a>
        @endif

        <h2>Categories</h2>
        <ul>
            @foreach ($categories as $category)
                <li>{{ $category->name }}</li>
            @endforeach
        </ul>

        <form action="{{route('user.logout')}}" method="POST">
            @csrf
            <button type="submit">Logout</button>
        </form>
    </main>

</body>
</html>
