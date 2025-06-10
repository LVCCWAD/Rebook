import React, { useState } from "react"

// Import all your category images
import bag from "../../../../public/Assets/Dashboard/Category/bag.png"
import notebook from "../../../../public/Assets/Dashboard/Category/notebook.webp"
import pen from "../../../../public/Assets/Dashboard/Category/pen.png"
import desktop from "../../../../public/Assets/Dashboard/Category/desktop.png"
// import health from "../../../../public/Assets/Dashboard/Category/health.png"
import lotion from "../../../../public/Assets/Dashboard/Category/lotion.jpg"

import gadget from "../../../../public/Assets/Dashboard/Category/gadget.png"
import sports from "../../../../public/Assets/Dashboard/Category/sports.png"
import table from "../../../../public/Assets/Dashboard/Category/table.jpg"


function Category({ onSendData, categories, products }) {
    const [selectedProducts, setSelectedProducts] = useState(products)
    const [productTitle, setProductTitle] = useState()

    const categoryImageMap = {
        'Fashion': bag,
        'Books & Stationery': notebook,
        'Electronics': desktop,
        'Health & Beauty': lotion,
        'Toys & Hobbies': pen,
        'Automotive': gadget,
        'Sports & Outdoors': sports,
        'Home & Garden': table,
        // Ensure all your categories are mapped here
    };

    function selectCategory(categoryName) {
        const matchedCategory = categories.find(
            c => c.name.toLowerCase() === categoryName.toLowerCase()
        )
        if (!matchedCategory) return

        const filteredProducts = products.filter(
            p => p.category_id === matchedCategory.id
        )

        setProductTitle(matchedCategory.name)
        setSelectedProducts(filteredProducts)

        onSendData({
            name: matchedCategory.name,
            products: filteredProducts
        })
    }

    return (
        <>
            <h2 className="mt-20 text-4xl font-bold text-[#5a1c1c] border-b border-gray-300 pb-4 uppercase text-center shadow-md rounded-xl">
                Categories
            </h2>

            {/* Centered horizontal scroll container with medium sizing */}
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 mt-6 py-2">
                {/* Centered flex container with medium sizing */}
                <div className="flex flex-nowrap gap-6 pb-4 min-w-max justify-center px-4">
                    {categories.map(category => {
                        const categoryImageSrc = categoryImageMap[category.name];

                        return (
                            <button
                                key={category.id}
                                onClick={() => selectCategory(category.name)}
                                className="flex flex-col items-center flex-shrink-0 w-56"
                            >
                                <div className="rounded-full shadow-lg p-4 bg-white flex items-center justify-center w-50 h-50 overflow-hidden">
                                    {categoryImageSrc ? (
                                        <img
                                            src={categoryImageSrc}
                                            alt={category.name}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center rounded-full shadow-md bg-gray-100 text-gray-500 text-center text-xs p-2 break-words">
                                            No image for {category.name}
                                        </div>
                                    )}
                                </div>
                                <p className="mt-2 text-sm text-[#5a1c1c] text-center font-semibold leading-tight w-full break-words hyphens-auto">
                                    {category.name}
                                </p>
                            </button>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Category
