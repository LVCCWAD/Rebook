import React, { useEffect } from "react";
import Slider from "./Slider";

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

                {/* --- PRODUCT --- */}
            </div>
        </>
    )
}
