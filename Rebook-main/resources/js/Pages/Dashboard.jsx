import React, { useEffect } from "react";
import Header from "../Components/DashboardComponents/Header";

export default function Dashboard(){
    // Validate component
    useEffect(() => {console.log("Rendering: Dashboard.jsx");}, []);

    return(
        <>
            {/* Dashboard.jsx */}
            <Header />
        </>
    )
}
