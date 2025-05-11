import React, { useState } from "react";

import Profile from "./Profile";

import user from "../../../../public/Assets/Profile/Menu/user.png"
import bell from "../../../../public/Assets/Profile/Menu/bell.png"
import task from "../../../../public/Assets/Profile/Menu/task.png"

export default function Body(){

    // logic to change the body

    // place holder of components

    const [expandedMenu, setExpandedMenu] = useState({
        myAccount: false,
        myPurchase: false,
        notification: false,
    })

    const toggleMenu = (menu) => {
        console.log('hi')
        setExpandedMenu(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }))
    }

    return(
        <>
            {/* --- BODY --- */}
            <div className="border mx-[10%] flex h-140 mt-20">

                {/* --- LEFT CONTAINER --- */}
                <div className="border w-[20%] flex flex-col items-center m-4">


                    {/* --- ACCOUNT --- */}
                    <div className="border w-full h-24  flex flex-row justify-start items-center">

                        {/* --- IMAGE or ICON --- */}
                        <div className="bg-purple-500 ml-4 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold">
                            A
                        </div>

                        {/* --- ACCOUNT DESCRIPTION --- */}
                        <div className="ml-4 flex flex-col justify-center items-start">
                            <p>User account</p>
                            <p>Edit</p>
                        </div>
                    </div>

                    {/* --- MENU --- */}
                    <div className="border w-full h-full p-4 space-y-4 ">

                        {/* --- MY ACCOUNT --- */}
                        <button
                            onClick={() => toggleMenu('myAccount')}
                            className="border w-full flex flex-row justify-start items-center gap-x-4"
                        >
                            <img
                                src={user}
                                alt=""
                                className="h-5 w-5"
                            />
                            <p>
                                My Account
                            </p>
                        </button>

                        {expandedMenu.myAccount && (
                               <div className="ml-8 mt-1 space-y-1">
                               <button className="w-full text-left py-2 px-1 text-gray-700 hover:text-orange-500 transition-colors">
                                 Profile
                               </button>
                               <button className="w-full text-left py-2 px-1 text-gray-700 hover:text-orange-500 transition-colors">
                                 Banks & Cards
                               </button>
                               <button className="w-full text-left py-2 px-1 text-gray-700 hover:text-orange-500 transition-colors">
                                 Addresses
                               </button>
                               <button className="w-full text-left py-2 px-1 text-gray-700 hover:text-orange-500 transition-colors">
                                 Change Password
                               </button>
                               <button className="w-full text-left py-2 px-1 text-gray-700 hover:text-orange-500 transition-colors">
                                 Privacy Settings
                               </button>
                               <button className="w-full text-left py-2 px-1 text-gray-700 hover:text-orange-500 transition-colors">
                                 Notification Settings
                               </button>
                             </div>
                        )}

                        {/* --- MY ACCOUNT --- */}
                        <button
                            className="border w-full flex flex-row justify-start items-center gap-x-4"
                        >

                            <img
                                src={task}
                                alt=""
                                className="h-5 w-5"
                            />
                            <p>
                                My Purchase
                            </p>
                        </button>

                        {/* --- MY ACCOUNT --- */}
                        <button
                            className="border w-full flex flex-row justify-start items-center gap-x-4">
                            <img
                                src={bell}
                                alt=""
                                className="h-5 w-5"
                            />
                            <p>
                                Notification
                            </p>
                        </button>

                    </div>
                </div>

                {/* --- RIGHT CONTAINER --- */}
                <Profile />


            </div>
        </>
    )
}
