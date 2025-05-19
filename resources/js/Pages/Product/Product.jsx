import React from "react";
import Header from "../../Components/DashboardComponents/Header";
import Navigation from "../../Components/DashboardComponents/Navigation";
import Body from "../../Components/ProductComponents/Body";

import { usePage } from "@inertiajs/react";
 function Product({}){
    const { product, reviews, user } = usePage().props
    console.log('product image',product.image_url)
    return(
        <>
            <Header />
            <Navigation />

            <div className="mx-[10%] mt-20">
                <Body product={product} reviews={reviews} user={user}/>
            </div>
        </>
    )
}
export default Product
