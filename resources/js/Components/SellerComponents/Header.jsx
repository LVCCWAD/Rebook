import React, { useState, useRef, useEffect } from "react";
import logo from "../../../../public/Assets/logo.png";
import menu from "../../../../public/Assets/Seller/menu.png"
import { Link, useForm } from "@inertiajs/react";

export default function Header(){
      const [open, setOpen] = useState(false); // set state of dropdown
      const dropdownRef = useRef(); // jsx view function

      // react hook synchronize a component with an external system
      useEffect(() => {

        // event is DOM html
        function handleClickOutside(event) {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) { // check if outside the container
            setOpen(false);
          }
        }

        document.addEventListener("mousedown", handleClickOutside); // DOM mouse event listener
        return () => document.removeEventListener("mousedown", handleClickOutside); // remove any events listeners

      }, []);

    // onclick function
    function onClickMenu(){
        setOpen(!open) // set value open
    }

    return(
        <>
            {/* --- HEADER --- */}
            <div className="bg-white shadow-md flex justify-between items-center py-4">

                {/* --- LEFT CONTAINER --- */}
                <div className="flex items-center ml-18">

                    {/* --- LOGO --- */}
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-56 m-2"
                    />

                    {/* --- TEXT --- */}
                    <span className="text-gray-600 text-sm ml-2 cursor-pointer" onClick={() => window.location.href = "/Sellerdash"}>
                        {/* Seller View */}
                    </span>
                </div>

                {/* --- RIGHT CONTAINER --- */}
                <div
                    className="relative inline-block text-left mr-4"
                    ref={dropdownRef}
                >

                    {/* --- BUTTON --- */}
                    <button
                        onClick={onClickMenu} // dropdown logic
                        className="p-2"
                    >
                        {/* --- MENU --- */}
                            <img
                                src={menu}
                                alt="menu"
                                className="w-8"
                            />
                    </button>

                    {/* --- OPEN --- */}
                    {open && ( // if true show the dropdown
                        <div className="absolute right-0 mt-8 w-56 bg-white rounded-lg shadow-lg p-4 grid grid-cols-2 gap-4 z-50">

                            {/* --- ORDER ICON --- */}
                            <button
                                onClick={() => alert("Navigating to My Orders")}
                                className="flex flex-col items-center cursor-pointer focus:outline-none"
                            >
                                <div className="bg-[#7a0d0d] text-white rounded-full p-3 text-xl">📋</div>
                                <span className="text-xs mt-1 text-center">Orders</span>
                            </button>

                            {/* --- PRODUCT ICON --- */}
                            <button
                                onClick={() => alert("Navigating to My Products")}
                                className="flex flex-col items-center cursor-pointer focus:outline-none"
                            >
                                <div className="bg-[#796008] text-white rounded-full p-3 text-xl">🛍️</div>
                                <span className="text-xs mt-1 text-center">Products</span>
                            </button>

                            {/* --- CUSTOMER ICON --- */}
                            <button
                                className="flex flex-col items-center cursor-pointer focus:outline-none"
                            >
                                <Link href="/dashboard" className="flex flex-col items-center">
                                    <div className="bg-[#0d1f7a] text-white rounded-full p-3 text-xl w-[48px] h-[48px]">🛒</div>
                                    <span className="text-xs mt-1 text-center">Customer</span>
                                </Link>
                            </button>

                            {/* --- RETURN ICON --- */}
                            <button
                                onClick={() => alert("Logging out...")}
                                className="flex flex-col items-center cursor-pointer focus:outline-none"
                            >
                                <div className="bg-gray-600 text-white rounded-full p-3 text-xl">↩️</div>
                                <span className="text-xs mt-1 text-center">Return</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
