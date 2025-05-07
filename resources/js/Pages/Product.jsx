import React from "react";
import Header from "../Components/DashboardComponents/Header";
import Navigation from "../Components/DashboardComponents/Navigation";
import Body from "../Components/ProductComponents/Body";

export default function Product(){
    return(
        <>
            {/* --- PRODUCT PAGE --- */}

                {/* --- HEADER --- */}
                <Header />

                {/* --- NAVIGATION --- */}
                <Navigation />

                {/* --- BODY --- */}
                <div className="mx-[10%] mt-20">
                    <Body />
                </div>
        </>
    )
}
