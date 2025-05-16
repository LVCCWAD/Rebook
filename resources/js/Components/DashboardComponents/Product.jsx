import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import pen from "../../../../public/Assets/Dashboard/Product/pen.jpg"
import iconCart from "../../../../public/Assets/Dashboard/Product/iconCart.png"
import iconStar1 from "../../../../public/Assets/Dashboard/Product/iconStar1.png"

function Product({ title, products }){
    return(
        <>
            {/* --- PRODUCT TITLE --- */}
            <h2 className="mt-20 text-2xl font-bold text-[#5a1c1c] border-b border-gray-300 pb-2 uppercase text-center mb-8">
                {title}
            </h2>

            {/* --- PRODUCT CONTAINER --- */}
            <div  className="flex flex-wrap flex-row justify-center w-full gap-10 px-[5%]">

                {/* --- PRODUCT CARD --- */}
                {products?.map((product) => (


                <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    method="get"
                    className="border rounded-md flex flex-col bg-gray-50"
                >
                    {/* {product} */}


                    {/* --- CARD IMG & TITLE --- */}
                    <div className="">
                        {/* --- IMG --- */}
                        <img
                            src={pen}
                            alt="product"
                            className="w-80 h-80"
                        />

                        {/* --- TITLE --- */}
                        <p className="text-center text-xl font-bold text-[#5a1c1c] p-4">{product.name}</p>
                    </div>

                    {/* --- CARD DESCRIPTION --- */}
                    <div className="p-2">

                        {/* --- RATING --- */}
                        <div className="flex flex-row justify-end mb-4">

                            {/* --- STAR --- */}
                            <img
                                src={iconStar1}
                                alt="star"
                                className="w-6"
                            />

                            {/* --- NUMBER --- */}
                            <p>
                                {/* logic rating */}
                                {5}
                            </p>
                        </div>

                        {/* --- ICON & PRICE ---*/}
                        <div className="flex flex-row justify-between items-center">
                            {/* --- ICON --- */}
                            <img
                                src={iconCart}
                                alt="cart"
                                className="w-8"
                            />

                            {/* --- PRICE --- */}
                            <p className="text-xl font-bold">
                                {/* logic pricing */}
                                ₱{100}
                            </p>
                        </div>
                    </div>

                </Link>
                ))}

            </div>
        </>
    )
}

export default Product
