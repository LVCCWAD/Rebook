import React, { useEffect } from "react";
import Slider from "./Slider";
import Category from "./Category";
import Product from "./Product";

export default function Body(){
    // Validate component
    useEffect(() => {console.log("Rendering: Dashboard.jsx");}, []);

    return(
        <>
            {/* --- BODY CONTAINER --- */}
            <div className="mx-[10%]">
                {/* --- SLIDER --- */}
                <Slider />

                {/* --- CATEGORY --- */}
                <Category />

                {/* --- PRODUCT --- */}
                <Product />

            </div>
        </>
    )
}
