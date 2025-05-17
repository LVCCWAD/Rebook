import React, { useState } from "react";
import Header from "../../Components/SellerComponents/Header";
import Body from "../../Components/SellerComponents/Body";
import { usePage } from "@inertiajs/react";

export default function Seller(){

    // usepage to retrieve data
    const [currentComponent, setCurrentComponent] = useState('dashboard')
    const { user, orders, products } = usePage().props

    console.log('user:', user)
    console.log('orders:', orders)
    console.log('products:', products)


    const handleComponentChange = (component) => {
        setCurrentComponent(component);
    }


    // logic for user orders

    return(
        <>
            {/* --- HEADER --- */}
            <Header user={user} currentComponent={currentComponent} onChangeComponent={handleComponentChange} />

            {/* --- BODY --- */}
            <Body
                component={currentComponent}
                user={user}
                onChangeComponent={handleComponentChange}
                orders={orders}
                products={products}/>
        </>
    )
}
