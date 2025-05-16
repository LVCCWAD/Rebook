import React from "react";

import Product from "./Body/Product";
import Rating from "./Body/Rating";

export default function Body({ product }){


    return(
        <>
            {/* --- BODY --- */}
            <div className="mx-[10%] mt-20">
                {/* --- PRODUCT --- */}
                <Product product={product}/>

                {/* --- COMMENT --- */}
                <Rating/>
            </div>
        </>
    )
}
