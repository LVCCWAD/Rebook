import React  from "react";
import Dashboard from "./Body/Dashboard";
import Register from "./Body/Register"
import Product from "./Body/Product";
import Order from "./Body/Order";

// retrieve list of seller body component

export default function Body(){
    // logic changing component
    return(
        <>
            {/* --- BODY --- */}

                {/* --- REGISTER --- */}
                {/* <Register /> */}

                {/* --- DASHBOARD --- */}
                {/* <Dashboard /> */}

                {/* --- ORDER --- */}
                {/* <Order /> */}

                {/* --- PRODUCT --- */}
                <Product />
        </>
    )
}
