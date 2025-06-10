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
            {/* Re-introducing overflow-x-auto for horizontal scroll */}
            {/* Adding 'hide-scrollbar' back (ensure you have this utility or provide custom CSS) */}
            {/* Adding py-2 to give vertical padding if there's any scrollbar space */}
            <div className="overflow-x-auto hide-scrollbar mt-6 py-2">
                {/* flex-nowrap forces items onto a single line */}
                {/* gap-8 px-4 justify-center are maintained */}
                <div className="flex flex-nowrap gap-8 px-4 justify-center">
                    {categories.map(category => {
                        const categoryImageSrc = categoryImageMap[category.name];

                        return (
                            <button
                                key={category.id}
                                onClick={() => selectCategory(category.name)}
                                class="flex flex-col items-center flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-56"
                                // Removed mb-6 here as we want a single row
                            >
                                <div class="rounded-full shadow-lg p-4 sm:p-6 md:p-8 bg-white flex items-center justify-center aspect-square overflow-hidden">
                                    {categoryImageSrc ? (
                                        <img
                                            src={categoryImageSrc}
                                            alt={category.name}
                                            class="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <div class="w-full h-full flex items-center justify-center rounded-full shadow-md bg-gray-100 text-gray-500 text-center text-sm p-2">
                                            No image for {category.name}
                                        </div>
                                    )}
                                </div>
                                <p class="mt-3 text-base sm:text-lg md:text-xl text-[#5a1c1c] text-center font-semibold whitespace-normal leading-tight">
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
