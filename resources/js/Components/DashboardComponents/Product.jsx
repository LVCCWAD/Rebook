import React, { useState } from "react";
import { Link } from "@inertiajs/react";

import iconStar1 from "../../../../public/Assets/Dashboard/Product/iconStar1.png";

function Product({ title, products, productsRating }) {
    const displayedProducts = products && Array.isArray(products)
        ? [...products].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        : [];

    return (
        <>
            <h2 className="shadow-md border-b mt-20 text-3xl font-bold text-[#5a1c1c] border-gray-300 py-4 uppercase text-center mb-8">
                {title}
            </h2>

            <div className="flex flex-wrap flex-row mb-20 justify-center w-full gap-10 px-[5%]">
                {displayedProducts.length > 0 ? (
                    displayedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            productsRating={productsRating}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-600 text-lg mt-10">No products available.</p>
                )}
            </div>
        </>
    );
}

// Separate component for individual product card with error handling
function ProductCard({ product, productsRating }) {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    const handleImageError = () => {
        setImageError(true);
        setImageLoading(false);
        console.warn(`Failed to load image for product ${product.id}:`, product.image_url);
    };

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    return (
        <Link
            href={`/product/${product.id}`}
            method="get"
            className="rounded-xl shadow-md flex flex-col bg-white overflow-hidden w-80"
        >
            {/* Product Image with Error Handling */}
            <div className="flex-shrink-0">
                {product.image_url && !imageError ? (
                    <div className="relative">
                        {imageLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl m-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5a1c1c]"></div>
                            </div>
                        )}
                        <img
                            src={product.image_url}
                            alt={product.name || "Product image"}
                            className={`w-full h-80 object-cover p-4 rounded-xl transition-opacity duration-300 ${
                                imageLoading ? 'opacity-0' : 'opacity-100'
                            }`}
                            onError={handleImageError}
                            onLoad={handleImageLoad}
                        />
                    </div>
                ) : (
                    <div className="w-full h-80 m-4 flex flex-col items-center justify-center rounded-xl shadow-md bg-gray-100 text-gray-500">
                        <svg
                            className="w-16 h-16 mb-2 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span className="text-sm text-center">
                            {imageError ? 'Image failed to load' : 'No image available'}
                        </span>
                        {imageError && (
                            <span className="text-xs text-red-500 mt-1 text-center px-2">
                                Error 403: Access denied
                            </span>
                        )}
                    </div>
                )}
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <p className="text-center text-2xl font-bold text-[#5a1c1c] mb-4">{product.name}</p>

                {/* Star Rating */}
                <div className="flex flex-row justify-end items-center mb-4">
                    <img
                        src={iconStar1}
                        alt="Star rating icon"
                        className="w-6 h-6 mr-1"
                    />
                    <span>
                        {productsRating && productsRating[product.id]
                            ? `${parseFloat(productsRating[product.id]).toFixed(2)}`
                            : "No rating yet"}
                    </span>
                </div>

                {/* Price */}
                <div className="flex flex-row justify-between items-center mt-auto">
                    <p className="text-xl font-bold">
                        ₱{product.price}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default Product;
