import React, { useEffect } from "react";
import Header from "../../Components/DashboardComponents/Header";
import Navigation from "../../Components/DashboardComponents/Navigation";
import Body from "../../Components/DashboardComponents/Body";

export default function Dashboard(){
    // Validate component
    useEffect(() => {console.log("Rendering: Dashboard.jsx");}, []);

    return(
        <>
            {/* --- DASHBOARD ---*/}

            {/* --- Header --- */}
            <Header />

            {/* --- Navigation --- */}
            <Navigation />

            {/* --- Body --- */}
            <Body />

            {/* --- Footer --- */}

        </>
    )
}
