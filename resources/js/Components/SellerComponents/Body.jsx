import React, { useState }  from "react";
import Dashboard from "./Body/Dashboard";
import Register from "./Body/Register"
import Product from "./Body/Product";
import Order from "./Body/Order";

function Body({
        component,
        onChangeComponent,
        user,
        seller_id,
        shop,
        categories,
        orderItems,
        products,
    }){

    const renderComponent = () => {
        console.log("dashboard component:", component)

         if (user?.role !== "seller" || shop == null) return <Register user={user}/>

        switch (component?.toLowerCase()) {

            case "order":
                return <Order/>
            case "product":
                return <Product products={products} categories={categories}/>
            default:
                return <Dashboard setCurrentComponent={onChangeComponent} />
        }
  }


    return(
        <>
            {renderComponent()}
        </>
    )
}

export default Body
