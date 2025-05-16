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
            {/* --- DASHBOARD ---*/}

            {/* --- Header --- */}
            <Header />

            {/* --- Navigation --- */}
            <Navigation />

            {/* --- Body --- */}
            <Body
                user={user}
                categories={categories}
                products={products}
            />

            {/* --- Footer --- */}


            {/* ========= END ========= */}
            <Link
                href='/logout'
                method='post'
                as='button'
                className='p-4 m-4 border rounded-md '
            >
                    Logout
            </Link>
            {/* <hr className="mt-20"/>
                <div className="flex flex-row justify-center items-center">
                </div>

            <hr />
                <h2 className="text-2xl">CATEGORY</h2>
                <ul>
                    {category?.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>

            <hr />
                <h2 className="text-2xl">USER</h2>

                 <h1>Welcome, {user.name}</h1>
            <hr />
                <h2 className="text-2xl">Product</h2>

                {products && products.length > 0 ?
                (
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>{product.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No products available.</p>
                )} */}

        </>
    )
}
