import React from "react";

import Header from "../../Components/DashboardComponents/Header"
import Navigation from "../../Components/DashboardComponents/Navigation"
import Body from "../../Components/ProfileComponents/Body"
import { usePage } from "@inertiajs/react";

export default function Profile(){

    const { user, orders } = usePage().props
    console.log(user,orders)

    return(
        <>
            {/* --- PROFILE PAGE --- */}

                {/* --- HEADER --- */}
                <Header />

                {/* --- NAVIGATION --- */}
                <Navigation />

                {/* --- BODY --- */}
                <Body user={user}/>

        </>
    )
}
