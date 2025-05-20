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
                        <Slider />

                        <Category
                            onSendData={handleCategoryClick}
                            categories={categories}
                            products={products}
                        />

                        <Product
                            title={productTitle}
                            products={products}
                        />
                    </div>
                ) : (
                    <div>
                        <Product
                            title={productTitle}
                            products={selectedCategory}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default Body
