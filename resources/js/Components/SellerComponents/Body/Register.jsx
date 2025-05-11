import React, { useState } from "react";

export default function Register(){
    const [showModal, setShowModal] = useState(true);

    return(
        <>
             <div className="bg-gray-100 h-screen flex items-center justify-center p-4">
                <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Left side content */}
                    <div className="max-w-md">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Grow your school supplies business with <span className="text-red-700">Re:Book</span> today!
                    </h1>
                    <p className="mt-4 text-gray-700">
                        Sell your school supplies on Re:Book. Our easy-to-use platform connects you with students, parents, and educators. From notebooks to backpacks, Re:Book helps you boost visibility and grow sales effortlessly.
                    </p>
                    </div>

                    {/* Right side modal */}
                    {showModal && (
                       <div className="flex items-center justify-center min-h-screen bg-gray-100">
                       <div className="w-80 bg-white rounded-lg shadow-lg border-2 border-purple-400 p-8 relative">
                         {/* Purple shadow effect */}
                         <div className="absolute inset-0 rounded-lg shadow-lg -right-1 -bottom-1 bg-purple-200 -z-10"></div>

                         {/* Logo */}
                         <div className="flex justify-center mb-8">
                           <div className="w-20 h-20">
                             <svg viewBox="0 0 100 100" className="w-full h-full">
                               <g stroke="black" strokeWidth="4" fill="none">
                                 {/* Shopping bag */}
                                 <rect x="20" y="38" width="60" height="50" rx="2" />

                                 {/* Handle */}
                                 <path d="M35 38C35 25 65 25 65 38" strokeLinecap="round" />
                               </g>

                               {/* RB text */}
                               <text x="33" y="75" fontSize="36" fontWeight="bold" fill="#990000" fontFamily="sans-serif">RB</text>
                             </svg>
                           </div>
                         </div>

                         {/* Text */}
                         <div className="text-center mb-8">
                           <p className="text-xl font-medium">Do you want to register as a seller?</p>
                         </div>

                         {/* Buttons */}
                         <div className="flex flex-col gap-3">
                           <button className="bg-green-700 hover:bg-green-800 text-white py-3 rounded-md text-lg font-medium">
                             Yes
                           </button>
                           <button className="bg-red-700 hover:bg-red-800 text-white py-3 rounded-md text-lg font-medium">
                             No
                           </button>
                         </div>
                       </div>
                     </div>
                    )}
                </div>
                </div>
        </>
    )
}
