import React from "react";
import { Link } from "@inertiajs/react";

// logic to retrieve specific product category

export default function Navigation(){
    return(
        <>
            {/* --- NAVIGATION --- */}
            <div className="flex flex-row justify-center flex-wrap gap-x-[3%] text-red-800 font-medium text-[18px] shadow-md pb-4">

                {/* --- Sale Items Link --- */}
                <button
                    onClick={() => setActiveComponent('SaleItems')}
                    className="hover:bg-red-800 hover:text-white hover:rounded-2xl hover:px-2 px-2"
                >
                    {/* return dashboard w/all product */}
                    <Link
                        href={"/dashboard"}
                        className="inline"
                    >
                        Sale Items
                    </Link>
                </button>

                {/* --- Wireless Earbuds Link --- */}
                <button
                    onClick={() => setActiveComponent('WirelessEarbuds')}
                    className="hover:bg-red-800 hover:text-white hover:rounded-2xl hover:px-2 px-2"
                >
                    {/* retrive specific data */}
                    Wireless Earbuds
                </button>

                {/* --- School Backpack Link --- */}
                <button
                    onClick={() => setActiveComponent('SchoolBackPacks')}
                    className="hover:bg-red-800 hover:text-white hover:rounded-2xl hover:px-2 px-2"
                >
                    {/* retrive specific data */}
                    School Backpack
                </button>

                {/* --- Spiral Notebook Link --- */}
                <button
                    onClick={() => { setActiveComponent('SpiralNoteBook')}}
                    className="hover:bg-red-800 hover:text-white hover:rounded-2xl hover:px-2 px-2"
                >
                    {/* retrive specific data */}
                    Spiral Notebook
                </button>

                {/* --- Gel Sanitizer Link --- */}
                <button
                    onClick={() => setActiveComponent('GelSanitizer')}
                    className="hover:bg-red-800 hover:text-white hover:rounded-2xl hover:px-2 px-2"
                >
                    {/* retrive specific data */}
                    Gel Sanitizer
                </button>

                {/* --- Laptop Link --- */}
                <button
                    onClick={() => setActiveComponent('Laptop')}
                    className="hover:bg-red-800 hover:text-white hover:rounded-2xl hover:px-2 px-2"
                >
                    {/* retrive specific data */}
                    Laptop
                </button>

                {/* --- Ballpoin Pen Link  --- */}
                <button
                    onClick={() => setActiveComponent('BallPointPen')}
                    className="hover:bg-red-800 hover:text-white hover:rounded-2xl hover:px-2 px-2"
                >
                    {/* retrive specific data */}
                    Ballpoint Pen
                </button>
            </div>
        </>
    )
}
