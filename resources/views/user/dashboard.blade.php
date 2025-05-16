<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div class="container">
        <h2>Your Notifications</h2>

        @if ($notifications->count())
            <ul class="list-group">
                @foreach ($notifications as $notification)
                    <li class="list-group-item @if(is_null($notification->read_at)) font-weight-bold @endif">
                        {{ $notification->data['message'] }}
                        <br>
                        <small>Order ID: {{ $notification->data['order_id'] }} - Amount: ${{ number_format($notification->data['amount'], 2) }}</small>
                        <br>
                        <small><em>{{ $notification->created_at->diffForHumans() }}</em></small>
                    </li>
                @endforeach
            </ul>

            {{ $notifications->links() }}
        @else
            <p>No notifications found.</p>
        @endif
    </div>





    <header>
        <h1>Re:Book</h1>
        <p>Welcome, {{ Auth::user()->name }}</p>
        <a href="{{route('cart.view', $user->id)}}">
            <p>Cart</p>
        </a>
        <img src="{{asset('storage/' . $user->image)}}" alt="User Image" width="150">
        <a href="{{route('user.profile')}}">Profile</a>
    </header>
    <main>
        <h1>Dashboard</h1>

        @if ($user->role === 'user')
            <a href="{{ route('user.become_seller') }}">
                <p>Start Selling</p>
            </a>
        @elseif ($user->role === 'seller')
            <a href="{{ route('shop.dashboard') }}">
                <p>Seller View</p>
            </a>
        @endif

        <!-- Search Form -->
        <form action="{{ route('user.dashboard') }}" method="GET">
            <label for="search">Search Products:</label>
            <input type="text" id="search" name="search" value="{{ request('search') }}" placeholder="Search by product name">
            <button type="submit">Search</button>
        </form>

        <h2>Categories</h2>
        <ul>
            @foreach ($categories as $category)
                <li>
                    <p>{{ $category->name }}</p>
                </li>
            @endforeach
        </ul>

        <!-- Display products per category -->
        @foreach ($categories as $category)
            <h2>{{ $category->name }}</h2>
            <ul>
                @forelse ($category->products as $product)
                    <li>
                        <p>{{ $product->name }}</p>
                        <p>{{ $product->price }}</p>
                        <a href="{{ route('product.show', $product->id) }}">
                            <p>View</p>
                        </a>
                    </li>
                @empty
                    <li>No matching products in this category.</li>
                @endforelse
            </ul>
        @endforeach

        <form action="{{ route('user.logout') }}" method="POST">
            @csrf
            <button type="submit">Logout</button>
        </form>
    </main>
</body>
</html>
