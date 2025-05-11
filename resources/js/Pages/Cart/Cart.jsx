import React, { useState } from "react";
import Header from "../../Components/DashboardComponents/Header";
import Navigation from "../../Components/DashboardComponents/Navigation";
import Body from "../../Components/CartComponents/Body";

export default function Cart(){

    return(
        <>
            {/* --- CART PAGE --- */}

                {/* --- HEADER --- */}
                <Header />

                {/* --- NAVIGATION --- */}
                <Navigation />

                {/* --- BODY --- */}
                <Body />
</>
    )
}
