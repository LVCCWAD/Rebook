import React, { useEffect } from "react";
import Header from "../../Components/DashboardComponents/Header";
import Navigation from "../../Components/DashboardComponents/Navigation";
import Body from "../../Components/DashboardComponents/Body";
import { Link, usePage } from "@inertiajs/react";


export default function Dashboard({}){

    const {
        user,
        categories,
        products
    } = usePage().props;

    return(
        <>
            <Header user={user}/>
            <Navigation />
            <Body
                user={user}
                categories={categories}
                products={products}
            />

            <Link
                href='/logout'
                method='post'
                as='button'
                className='p-4 m-4 border rounded-md '
            >
                    Logout
            </Link>
        </>
    )
}
