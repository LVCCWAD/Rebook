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
        <a href="{{route('user.dashboard')}}">Back to dashboard</a>
        <p>{{$user->name}}</p>
        <img src="{{asset('storage/' . $user->image)}}" alt="User Image" width="150">
    </header>
    <hr>
    <main>
        <h1>Order Details</h1>
        @foreach ($order as $orders)
            <h2>Order #{{$orders->id}}</h2>
            <p>Status: {{$orders->status}}</p>
            <p>Total: {{$orders->total}}</p>
            <p>Transaction Id: {{$orders->payment->transaction_id}}</p>
            @if(!$orders->shipping)
                <a href="{{ route('shipping.form') }}">Add Shipping Details</a>
            @else
                <p>Shipping:
                    {{$orders->shipping->city_name}},
                    {{$orders->shipping->address}},
                    {{$orders->shipping->zip_code}},
                    {{$orders->shipping->country}}</p>
            @endif
            <hr>
            <h3>Items</h3>

            @if ($orders->orderItems->isEmpty())
                <p>No items in this order.</p>
            @else
                {{-- table --}}
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($orders->orderItems as $item)
                            <tr>
                                <td>
                                    <img src="{{ asset('storage/' . $item->product->image) }}" alt="Product Image" width="150">
                                </td>
                                <td>{{$item->product->name}}</td>
                                <td>{{$item->quantity}}</td>
                                <td>₱{{$item->price}}</td>
                                <td>₱{{$item->price * $item->quantity}}</td>
                            </tr>

                            {{-- cancel order --}}
                            @if($orders->status == 'pending')
                                <form action="{{ route('order.cancel', $orders->id) }}" method="POST">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit">Cancel Order</button>
                                </form>
                            @endif
                        @endforeach
                    </tbody>
                </table>
            @endif
        @endforeach
        <hr>
        <h1>User Profile</h1>
        <form action="{{route('user.profile.update')}}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            <div>
                <label for="name">Name: </label>
                <input type="text" id="name" name="name" value="{{ $user->name }}" required>
            </div>
            <div>
                <label for="email">Email: </label>
                <input type="email" id="email" name="email" value="{{ $user->email }}" required>
            </div>
            <div>
                <label for="image">Profile Image: </label>
                <input type="file" id="image" name="image" accept="image/*">
                @if ($user->image)
                    <img src="{{ asset('storage/' . $user->image) }}" alt="User Image" width="150">
                @endif
            </div>
            <button type="submit">Update Profile</button>

        </form>
    </main>
</body>
</html>
