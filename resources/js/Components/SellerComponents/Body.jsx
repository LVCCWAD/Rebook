import React, { useState }  from "react";
import Dashboard from "./Body/Dashboard";
import Register from "./Body/Register"
import Product from "./Body/Product";
import Order from "./Body/Order";

function Body({ component, user, onChangeComponent , orders, products}){

    const renderComponent = () => {
        console.log("dashboard component:", component)

         if (user?.role !== "seller") return <Register />

        switch (component?.toLowerCase()) {

            case "order":
                return <Order/>
            case "product":
                return <Product />
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
