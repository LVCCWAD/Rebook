import React, { useState } from "react"
import CartDetail from "../CartComponents/Body/CartDetail"

function Body({ user, cart, cart_Items, shippingAddresses, orders, products}) {
    return (
        <>
            <CartDetail
                user={user}
                cart={cart}
                cart_Items={cart_Items}
                shippingAddresses={shippingAddresses}
                orders={orders}
                products={products}
            />
        </>
    );
}

export default Body;
