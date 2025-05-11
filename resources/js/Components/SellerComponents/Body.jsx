import React  from "react";
import Dashboard from "./Body/Dashboard";
import Register from "./Body/Register"

// retrieve list of seller body component

export default function Body(){
    return(
        <>
            {/* --- BODY --- */}

                {/* --- REGISTER --- */}
                <Register />

                {/* --- DASHBOARD --- */}
                {/* <Dashboard /> */}
        </>
    )
}
