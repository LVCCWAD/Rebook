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

    <h2>Reviews</h2>
    @if($reviews->isEmpty())
        <p>No reviews available for this product.</p>
    @else
        <ul>
            @foreach ($reviews as $review)
                <li>
                    <strong>{{ $review->user->name }}:</strong>(Rating: {{ $review->rating }}) {{ $review->created_at->format('Y-m-d') }}
                    <p>{{ $review->comment }}</p>

                {{-- ongoing changes --}}
                    {{-- @if(Auth::check() && Auth::id() === $review->user_id)
                        <form action="{{ route('product.review.destroy', $review->id) }}" method="POST">
                            @csrf
                            @method('DELETE')
                            <button type="submit">Delete</button>
                        </form>
                    {{-- @if(Auth::check() && Auth::id() === $review->user_id)
                        <form action="{{ route('product.review.edit', $review->id) }}" method="POST">
                            @csrf
                            @method('PUT')

                            <label for="comment">Edit Comment: </label>
                            <textarea name="comment" id="comment" required>{{ $review->comment }}</textarea>
                            <label for="rating">Edit Rating:</label>
                            <select name="rating" id="rating">
                                @for ($i = 1; $i <= 5; $i++)
                                    <option value="{{ $i }}" {{ $review->rating == $i ? 'selected' : '' }}>{{ $i }}</option>
                                @endfor
                            </select>
                        </form>
                    @else
                        <p>{{ $review->comment }}</p>
                        <p>Rating: {{ $review->rating }}</p>
                        <p>Reviewed on: {{ $review->created_at->format('Y-m-d') }}</p>
                    @endif --}}
                </li>
            @endforeach
        </ul>
    @endif
    <h2>Leave a Review</h2>
    <form action="{{ route('product.review.store', $product->id) }}" method="POST">
        @csrf
        <label for="comment">Comment:</label>
        <textarea name="comment" id="comment" required></textarea>

        <label for="rating">Rating:</label>
        <select name="rating" id="rating" required>
            @for ($i = 1; $i <= 5; $i++)
                <option value="{{ $i }}">{{ $i }}</option>
            @endfor
        </select>

        <button type="submit">Submit Review</button>
</body>
</html>
