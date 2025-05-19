import React, { useState } from "react";
import Header from "../../Components/DashboardComponents/Header";
import Navigation from "../../Components/DashboardComponents/Navigation";
import Body from "../../Components/CartComponents/Body";
import { usePage } from "@inertiajs/react";

export default function Cart(){

    const { user, cart, cartItems } = usePage().props



    return(
        <>
            {/* --- CART PAGE --- */}

                {/* --- HEADER --- */}
                <Header />

                {/* --- NAVIGATION --- */}
                <Navigation />

                {/* --- BODY --- */}
                <Body
                    user={user}
                    cart={cart}
                    cart_Items={cartItems}
                />
</>
    )
}
