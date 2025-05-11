import React from "react";

import Header from "../../Components/DashboardComponents/Header"
import Navigation from "../../Components/DashboardComponents/Navigation"
import Body from "../../Components/ProfileComponents/Body"

export default function Profile(){

    return(
        <>
            {/* --- PROFILE PAGE --- */}

                {/* --- HEADER --- */}
                <Header />

                {/* --- NAVIGATION --- */}
                <Navigation />

                {/* --- BODY --- */}
                <Body />

        </>
    )
}
