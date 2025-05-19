import React, { useState } from "react";
import Header from "../../Components/SellerComponents/Header";
import Body from "../../Components/SellerComponents/Body";
import { usePage } from "@inertiajs/react";

export default function Seller(){

    // usepage to retrieve data
    const [currentComponent, setCurrentComponent] = useState('dashboard')
    const {
        user,
        seller_id,
        shop,
        categories,
        orderItems,
        products,
     } = usePage().props

     console.log('user: ', user);
     console.log('seller_id: ', seller_id);
     console.log('shop: ', shop);
     console.log('categories: ', categories);
     console.log('orderItems: ', orderItems);
     console.log('product: ', products);




    const handleComponentChange = (component) => {
        setCurrentComponent(component);
    }


    // logic for user orders

    return(
        <>
            {/* --- HEADER --- */}
            <Header
                currentComponent={currentComponent}
                onChangeComponent={handleComponentChange}
                user={user}
            />

            {/* --- BODY --- */}
            <Body
                component={currentComponent}
                onChangeComponent={handleComponentChange}
                user={user}
                seller_id={seller_id}
                shop={shop}
                categories={categories}
                orderItems={orderItems}
                products={products}

            />
        </>
    )
}
