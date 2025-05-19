
import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Comment from './Comment';

const StarIcon = ({ filled, size = 24, color = "#ccc", fillColor = "#FF5722" }) => (
  <span
    style={{
      fontSize: `${size}px`,
      color: filled ? fillColor : color,
      cursor: 'pointer',
      userSelect: 'none'
    }}
    aria-hidden="true"
  >
    ★
  </span>
);

const ReadOnlyStars = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          size={16}
          filled={rating >= star}
          color="#ccc"
          fillColor="#FF5722"
        />
      ))}
    </div>
  );
};

function Rating({ product, reviews, user}) {
    const [hoverRating, setHoverRating] = useState(0);
    const matchingReviews = reviews.filter((review) => review.product_id === product.id);

    const { data, setData, post, processing, errors, reset } = useForm({
        rating: reviews?.rating || 0,
        comment: reviews?.comment || '',
    });


    const handleSubmit = (e) => {
    e.preventDefault();
        post(`/product/${product.id}/review`, {
        preserveScroll: true,
        onSuccess: () => {
            reset('comment');
        },
        });
    };


    return (
    <>
        {/* <Comment reviews={reviews} user={user} product={product}/> */}

        <div className="rounded-xl bg-white p-6 shadow-md my-8 ">
            <div >
                <div className="space-y-4">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden my-8">

                        {matchingReviews.length > 0 ? (
                            matchingReviews.map((review) => (
                            <div key={review.id} className="border-b border-gray-400 pb-4 last:border-b-0 m-4">
                                <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">

                                    {review.user && review.user.image ? (
                                            <img
                                            src={review.user.image}
                                            alt={review.user.name}
                                            className="h-10 w-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <svg
                                            className="h-6 w-6 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                            </svg>
                                        )}

                                    <span className="font-medium text-gray-800">
                                    {review.user?.name || 'Anonymous'}
                                    </span>

                                    <ReadOnlyStars rating={review.rating} />
                                </div>
                                    <span className="text-sm text-gray-500">
                                        {new Date(review.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-gray-700">{review.comment}</p>

                                {review.is_owner && (
                                <div className="mt-2 flex justify-end">
                                    <a
                                    href={`/product/${product.id}/review/edit`}
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                    Product review
                                    </a>
                                </div>
                                )}
                            </div>
                            ))
                        ) : (
                            <div className="w-full text-center py-8">
                            <p className="text-gray-500">No reviews for this product yet.</p>
                            </div>
                        )}
                        </div>
                </div>
            </div>

            <h3 className="text-lg font-medium mb-4">
                {reviews ? 'Edit Your Review' : 'Write a Review'}
            </h3>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating <span className="text-red-500">*</span>
                </label>

                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setData('rating', star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none"
                    >
                        <StarIcon
                        size={24}
                        filled={(hoverRating || data.rating) >= star}
                        color="#ccc"
                        fillColor="#FF5722"
                        />
                    </button>
                    ))}
                </div>

                {errors.rating && (
                    <p className="text-red-500 text-xs mt-1">{errors.rating}</p>
                )}
                </div>

                <div className="mb-4">
                <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Your Review
                </label>

                <textarea
                    id="comment"
                    rows={4}
                    value={data.comment}
                    onChange={(e) => setData('comment', e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 px-3 py-2 border"
                    placeholder="Share your experience with this product..."
                />

                {errors.comment && (
                    <p className="text-red-500 text-xs mt-1">{errors.comment}</p>
                )}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition duration-200 disabled:opacity-75"
                    >
                        {processing ? 'Submitting...' : reviews ? 'Send Review' : 'Submit Review'}
                    </button>
                </div>
            </form>
        </div>
    </>
  );
}

export default Rating;
