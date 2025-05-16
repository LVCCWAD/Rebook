import React from "react";
import Header from "../../Components/DashboardComponents/Header";
import Navigation from "../../Components/DashboardComponents/Navigation";
import Body from "../../Components/ProductComponents/Body";

import { usePage } from "@inertiajs/react";

 function Product({}){
    const { product } = usePage().props

//    console.log('Passed to get operation message: ', request);
    console.log('Product data: ', product);


    return(
        <>
            {/* --- PRODUCT PAGE --- */}

                {/* --- HEADER --- */}
                <Header />

                {/* --- NAVIGATION --- */}
                <Navigation />

                {/* --- BODY --- */}
                <Body product={product}/>
        </>
    )
}

export default Product
