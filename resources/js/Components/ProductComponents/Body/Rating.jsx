import { useState } from 'react';

// import { MoreVertical, Star } from 'lucide-react';

 function Rating({ }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const ratingFilters = [
    { name: 'All', count: null },
    { name: '5 Star', count: '10K+' },
    { name: '4 Star', count: '3.8K' },
    { name: '3 Star', count: '2.2K' },
    { name: '2 Star', count: '714' },
    { name: '1 Star', count: '1.1K' },
  ];

  const additionalFilters = [
    { name: 'With Comments', count: '9.6K' },
    { name: 'With Media', count: '5K' },
  ];

  const reviews = [
    {
      id: 1,
      username: 'r****g',
      rating: 5,
      date: '2023-05-08 22:00',
      variation: 'Black',
      color: 'black',
      material: 'plastic',
      appearance: 'shades',
      comment: "I rate this item 5 stars because even if the price is inexpensive it looks incredible. Helpful because it blocked the sun's rays. It's clear to see everything while using it. Thanks to this product.",
      likes: 98,
      media: [1, 2, 3, 4, 5, 6].map(i => `/api/placeholder/140/100`),
      hasVideo: true
    },
    {
      id: 2,
      username: 'jeselle_encina',
      rating: 5,
      date: '2023-01-21 19:26',
      variation: 'Black',
      comment: "mabilis dumating and maganda ang quality very affordable price pang yayamanin ang styles thank you so much seller will order again",
      likes: 49,
      media: [1, 2, 3, 4, 5, 6].map(i => `/api/placeholder/140/100`),
      hasVideo: true
    }
  ];

  const RatingStars = ({ rating }) => {
    return (
      <div className="flex">
        {/* {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < rating ? "#FF5722" : "none"}
            color={i < rating ? "#FF5722" : "#ccc"}
          />
        ))} */}
      </div>
    );
  };

  return (
        <>
            <div className="max-w-3xl mt-20 mx-auto bg-white">
            <div className="p-4">
                <h2 className="text-xl font-medium mb-4">Product Ratings</h2>

                <div className="bg-gray-50 p-4 rounded mb-6">
                <div className="flex items-center mb-4">
                    <span className="text-3xl font-bold text-red-500 mr-2">4.8</span>
                    <span className="text-sm text-gray-500 mr-4">out of 5</span>
                    <div className="flex">
                    {/* {[...Array(5)].map((_, i) => (
                        <Star
                        key={i}
                        size={24}
                        fill="#FF5722"
                        color="#FF5722"
                        />
                    ))} */}
                    </div>
                </div>

                {/* rating category */}
                {/* <div className="flex flex-wrap gap-2 mb-3">
                    {ratingFilters.map((filter) => (
                    <button
                        key={filter.name}
                        className={`px-4 py-1 text-sm rounded border ${
                        activeFilter === filter.name
                            ? 'bg-red-500 text-white border-red-500'
                            : 'bg-white text-gray-700 border-gray-300'
                        }`}
                        onClick={() => setActiveFilter(filter.name)}
                    >
                        {filter.name} {filter.count && `(${filter.count})`}
                    </button>
                    ))}
                </div> */}


                {/* <div className="flex flex-wrap gap-2">
                    {additionalFilters.map((filter) => (
                    <button
                        key={filter.name}
                        className="px-4 py-1 text-sm rounded border bg-white text-gray-700 border-gray-300"
                    >
                        {filter.name} {filter.count && `(${filter.count})`}
                    </button>
                    ))}
                </div> */}
                </div>

                {/* Reviews */}
                <div className="divide-y">

                {reviews.map((review) => (
                    <div key={review.id} className="py-4">
                    <div className="flex items-center mb-2">
                        <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3">

                        {/* --- AVATAR --- */}
                        {review.avatar ? (
                            <img src={review.avatar} alt={review.username} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                            {review.username.charAt(0).toUpperCase()}
                            </div>
                        )}

                        </div>
                        <div>
                        <div className="font-medium">{review.username}</div>
                        <RatingStars rating={review.rating} />
                        </div>
                    </div>

                    <div className="text-sm text-gray-500 mb-2">
                        {/* {review.date} | Variation: {review.variation} */}
                        {review.date}
                    </div>

                    {(review.color || review.material || review.appearance) && (

                        <div className="mb-2">
                        {/* {review.color && (
                            <div className="text-sm mb-1">
                            <span className="text-gray-500">Colour:</span> <span className="ml-1">{review.color}</span>
                            </div>
                        )}
                        {review.material && (
                            <div className="text-sm mb-1">
                            <span className="text-gray-500">Material Quality:</span> <span className="ml-1">{review.material}</span>
                            </div>
                        )}
                        {review.appearance && (
                            <div className="text-sm mb-1">
                            <span className="text-gray-500">Appearance:</span> <span className="ml-1">{review.appearance}</span>
                            </div>
                        )} */}
                        </div>
                    )}

                    <div className="text-sm mb-3">
                        {review.comment}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                        {/* {review.media.map((src, idx) => (
                        <div key={idx} className="relative w-16 h-16 bg-gray-100">
                            <img src={src} alt="" className="w-full h-full object-cover" />
                            {idx === 0 && review.hasVideo && (
                            <div className="absolute bottom-1 left-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                                0:{idx < 10 ? `1${idx}` : `${idx}`}
                            </div>
                            )}
                        </div>
                        ))} */}
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center text-gray-500">
                        <button className="flex items-center">
                            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            <span>{review.likes}</span>
                        </button>
                        </div>
                        <button className="text-gray-400">
                        {/* <MoreVertical size={20} /> */}
                        </button>
                    </div>
                    </div>
                ))}
                </div>
            </div>

                {/* --- USER COMMENT --- */}
                <div className='border w-full bg-gray-100 mt-20'>
                    <span>comment here</span>
                </div>
            </div>
        </>
  );
}

export default Rating
