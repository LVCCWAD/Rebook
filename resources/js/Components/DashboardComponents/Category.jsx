import React, { useState } from "react";

// Import all your category images.
// These paths are relative to your Category.jsx component.
// Ensure these files actually exist at these relative paths in your project structure.
import bag from "../../../../public/Assets/Dashboard/Category/bag.png";
import notebook from "../../../../public/Assets/Dashboard/Category/notebook.webp";
import pen from "../../../../public/Assets/Dashboard/Category/pen.png";
import desktop from "../../../../public/Assets/Dashboard/Category/desktop.png";
import lotion from "../../../../public/Assets/Dashboard/Category/lotion.jpg";
import gadget from "../../../../public/Assets/Dashboard/Category/gadget.png";
import sports from "../../../../public/Assets/Dashboard/Category/sports.png";
import table from "../../../../public/Assets/Dashboard/Category/table.jpg";


function Category({ onSendData, categories, products }) {
    const [selectedProducts, setSelectedProducts] = useState(products);
    const [productTitle, setProductTitle] = useState();

    // This is the CRUCIAL part: The keys MUST match the 'name' property
    // of the category objects you receive from your Laravel backend.
    const categoryImageMap = {
        'Writing & Drawing Supplies': pen,        // Assign 'pen' for writing supplies
        'Paper & Notebooks': notebook,           // 'notebook' is a perfect fit
        'Organization & Storage': bag,           // 'bag' for storage/backpacks
        'Tools & Accessories': gadget,           // 'gadget' can represent various tools/tech
        'Art & Craft Supplies': table,           // 'table' as a general art workspace
        'Specific Subject Supplies': desktop,    // 'desktop' for tech-related or specialized subjects
        'Miscellaneous & Personal Items': sports, // 'sports' for general personal/active items
        // 'lotion' is imported but currently not mapped to any of the new school categories.
        // If you had a category like 'Personal Care' among school items, you could map it there.
    };

    function selectCategory(categoryName) {
        // Find the category object that matches the clicked category name (case-insensitive)
        const matchedCategory = categories.find(
            c => c.name.toLowerCase() === categoryName.toLowerCase()
        );
        if (!matchedCategory) {
            console.warn(`Category "${categoryName}" not found in props.categories.`);
            return; // Exit if no matching category is found
        }

        // Filter products based on the matched category's ID
        const filteredProducts = products.filter(
            p => p.category_id === matchedCategory.id
        );

        setProductTitle(matchedCategory.name);
        setSelectedProducts(filteredProducts);

        // Send data back to the parent component
        onSendData({
            name: matchedCategory.name,
            products: filteredProducts
        });
    }

    return (
        <>
            <h2 className="mt-20 text-4xl font-bold text-[#5a1c1c] border-b border-gray-300 pb-4 uppercase text-center shadow-md rounded-xl">
                Categories
            </h2>

            {/* Container for horizontal scrolling categories */}
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 mt-6 py-2">
                <div className="flex flex-nowrap gap-6 pb-4 min-w-max justify-center px-4">
                    {/* Map through the categories received from props */}
                    {categories.map(category => {
                        // Look up the image source using the category's name as the key
                        const categoryImageSrc = categoryImageMap[category.name];

                        // Debugging: uncomment these lines to see what names are coming from the backend
                        // console.log("Category from props:", category.name);
                        // console.log("Image mapped:", categoryImageSrc ? "Found" : "Not Found", categoryImageSrc);

                        return (
                            <button
                                key={category.id}
                                onClick={() => selectCategory(category.name)}
                                className="flex flex-col items-center flex-shrink-0 w-56"
                            >
                                <div className="rounded-full shadow-lg p-4 bg-white flex items-center justify-center w-50 h-50 overflow-hidden">
                                    {/* Conditionally render image or a fallback div */}
                                    {categoryImageSrc ? (
                                        <img
                                            src={categoryImageSrc}
                                            alt={category.name}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center rounded-full shadow-md bg-gray-100 text-gray-500 text-center text-xs p-2 break-words">
                                            No image for <br /> {category.name}
                                        </div>
                                    )}
                                </div>
                                <p className="mt-2 text-sm text-[#5a1c1c] text-center font-semibold leading-tight w-full break-words hyphens-auto">
                                    {category.name}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Category;
