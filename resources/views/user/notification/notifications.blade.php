@extends('layouts.app')

@section('content')
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
@endsection
