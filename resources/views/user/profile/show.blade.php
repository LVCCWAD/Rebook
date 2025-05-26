<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>User Profile</title>
</head>
<body>
    {{-- Navigation --}}
    <header>
        <a href="{{ route('user.dashboard') }}">Back to Dashboard</a>
        <p>{{ $user->name }}</p>
        <img src="{{ asset('storage/' . $user->image) }}" alt="User Image" width="150" />
    </header>
    <hr />

    {{-- Flash messages --}}
    @if(session('success'))
        <p style="color: green;">{{ session('success') }}</p>
    @endif
    @if(session('error'))
        <p style="color: red;">{{ session('error') }}</p>
    @endif

    <main>
        {{-- Orders --}}
        <h1>Order Details</h1>
        @forelse ($orders as $order)
            <section style="margin-bottom: 30px;">
                <a href="{{route('order.show', $order->id)}}">
                    <h2>Order #{{$order->id}}</h2>
                </a>
                <p>Status: {{ $order->status }}</p>
                <p>Total: ₱{{ $order->total }}</p>

                {{-- Payment Info --}}
                @if (!$order->payment || !$order->payment->transaction_id)
                    <p>Payment: Not paid</p>
                @else
                    <p>Transaction ID: {{ $order->payment->transaction_id }}</p>
                @endif

                {{-- Shipping Info --}}
                @if (!$order->shipping)
                    <a href="{{ route('shipping.form') }}">Add Shipping Details</a>
                @else
                    <p>Shipping:
                        {{ $order->shipping->city_name }},
                        {{ $order->shipping->address }},
                        {{ $order->shipping->zip_code }},
                        {{ $order->shipping->country }}
                    </p>
                @endif

                {{-- Order Items --}}
                @if ($order->orderItems->isEmpty())
                    <p>No items in this order.</p>
                @else
                    <table border="1" cellpadding="8" cellspacing="0">
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
                            @foreach ($order->orderItems as $item)
                                <tr>
                                    <td>
                                        <img src="{{ asset('storage/' . $item->product->image) }}" width="100" alt="Product Image" />
                                    </td>

                                    <td>{{ $item->product->name }}</td>
                                    <td>{{ $item->quantity }}</td>
                                    <td>₱{{ $item->price }}</td>
                                    <td>₱{{ $item->price * $item->quantity }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>

                    {{-- Cancel or Pay --}}
                    @if ($order->status === 'pending')
                        <form action="{{ route('order.cancel', $order->id) }}" method="POST" style="margin-top: 10px;">
                            @csrf
                            @method('DELETE')
                            <button type="submit">Cancel Order</button>
                        </form>

                        {{-- Pay only if shipping exists --}}
                        @if ($order->shipping)
                            <form action="{{ route('payment.store', $order->id) }}" method="POST" style="margin-top: 5px;">
                                @csrf
                                <input type="hidden" name="amount" value="{{ $order->total }}" />
                                <button type="submit">Pay Now</button>
                            </form>
                        @else
                            <p style="color: red;">Please add or select a shipping address to proceed with payment.</p>
                        @endif

                    @elseif ($order->status === 'completed' && $order->payment)
                        <form action="{{ route('payment.cancelled', $order->id) }}" method="POST" style="margin-top: 10px;">
                            @csrf
                            <input type="hidden" name="amount" value="{{ $order->payment->amount }}" />
                            <button type="submit">Cancel Paid Order</button>
                        </form>
                    @endif
                @endif
            </section>
        @empty
            <p>No orders found.</p>
        @endforelse

        {{-- User Profile Update --}}
        <hr />
        <h1>Update Profile</h1>
        <form action="{{ route('user.profile.update') }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')

            <div>
                <label for="name">Name: </label>
                <input type="text" name="name" id="name" value="{{ old('name', $user->name) }}" required />
            </div>

            <div>
                <label for="email">Email: </label>
                <input type="email" name="email" id="email" value="{{ old('email', $user->email) }}" required />
            </div>

            <div>
                <label for="image">Profile Image: </label>
                <input type="file" name="image" id="image" accept="image/*" />
                @if ($user->image)
                    <img src="{{ asset('storage/' . $user->image) }}" width="150" alt="Current Profile Image" />
                @endif
            </div>

            <button type="submit">Update Profile</button>
        </form>
    </main>
</body>
</html>
