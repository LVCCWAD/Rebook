import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import Category from "./Category";
import Product from "./Product";

function Body({ user, categories, products }){


    const [showCategory, setShowCategory] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [productTitle, setProductTitle] = useState('Discover')
    const [productList, setProductList] = useState()

    const handleCategoryClick = (category) => {
        console.log('Category to Body title: ', category)
        setSelectedCategory(category.products)
        setProductTitle(category.name);
        setShowCategory(false)
    }

    return(
        <>
            <div  className="mx-[10%]">
                {showCategory ? (
                    <div>
                        {/* <Slider /> */}

                        <Category
                            onSendData={handleCategoryClick}
                            categories={categories}
                            products={products}
                        />

                        {/* --- ALL PRODUCT --- */}
                        <Product
                            title={productTitle}
                            products={products}
                        />
                    </div>
                ) : (
                    // --- PRODUCT ---
                    <div>
                        <Product
                            title={productTitle}
                            products={selectedCategory}
                        />
                    </div>
                )}
            </div>

            {/* <hr className="mt-20"/> */}

                {/* {category.map((cat) => (
                    <div key={cat.id}>
                        <Product
                            title={cat.name}
                            products={cat.name}
                        />
                    </div>
                ))} */}


        </>
    )
}

export default Body
