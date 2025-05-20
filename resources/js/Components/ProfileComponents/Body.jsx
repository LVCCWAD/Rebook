import React, { useState } from "react";

import Profile from "./Profile";

import userIcon from "../../../../public/Assets/Profile/Menu/user.png"
import bell from "../../../../public/Assets/Profile/Menu/bell.png"
import task from "../../../../public/Assets/Profile/Menu/task.png"

export default function Body({user}){

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
            <div className="mx-[10%] flex h-auto mt-20 rounded-xl bg-white shadow-md mb-20">

                <div className="w-[20%] flex flex-col items-center m-4">


                    <div className="w-full h-24 flex flex-row justify-start items-center bg-white shadow-md rounded-xl mb-4">

                        <div className="bg-purple-500 ml-4 text-white w-12 h-12 rounded-full shadow-md flex items-center justify-center">
                            {/* First letter of user without uploaded image */}
                            <span className="m-12 text-xl font-semibold">A</span>
                        </div>

                        {/* --- ACCOUNT DESCRIPTION --- */}
                        <div className="w-full flex flex-row justify-around ">
                            <p>{user.name}</p>
                            <div>Edit</div>
                        </div>
                    </div>

                    {/* --- MENU --- */}
                    <div className="w-full h-auto p-4 space-y-4 bg-white shadow-md rounded-xl flex-col">

                        {/* --- MY ACCOUNT --- */}
                        <button
                            onClick={() => toggleMenu('myAccount')}
                            className="w-full flex flex-row justify-start items-center gap-x-4 bg-white shadow-md rounded-md"
                        >
                            <img
                                src={userIcon}
                                alt=""
                                className="h-5 w-5 m-4"
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
                            className="w-full flex flex-row justify-start items-center gap-x-4 bg-white shadow-md rounded-md"
                        >

                            <img
                                src={task}
                                alt=""
                                className="h-5 w-5 m-4"
                            />
                            <p>
                                My Purchase
                            </p>
                        </button>

                        {/* --- MY ACCOUNT --- */}
                        <button
                            className="w-full flex flex-row justify-start items-center gap-x-4 bg-white shadow-md rounded-md">
                            <img
                                src={bell}
                                alt=""
                                className="h-5 w-5 m-4"
                            />
                            <p>
                                Notification
                            </p>
                        </button>

                        {/* Go to Seller Page */}
                        <button
                            className="w-full flex flex-row justify-start items-center gap-x-4 bg-white shadow-md rounded-md">
                            <img
                                src={bell}
                                alt=""
                                className="h-5 w-5 m-4"
                            />
                            <p>
                                Become seller
                            </p>
                        </button>

                        {/* Logout user */}
                        <button
                            className="w-full flex flex-row justify-start items-center gap-x-4 bg-white shadow-md rounded-md">
                            <img
                                src={bell}
                                alt=""
                                className="h-5 w-5 m-4"
                            />
                            <p>
                                Logout
                            </p>
                        </button>

                    </div>
                </div>

                {/* --- RIGHT CONTAINER --- */}
                <Profile user={user}/>


            </div>
        </>
    )
}
