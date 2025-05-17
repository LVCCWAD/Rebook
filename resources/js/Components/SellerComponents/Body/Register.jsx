import React, { useState } from "react";

import logo from "../../../../../public/Assets/logo.png";
import { Link } from "@inertiajs/react";
export default function Register(){
    const [showModal, setShowModal] = useState(true);

    return(
        <>
                {/* Main content */}
                <main className="container mx-auto px-4 md:px-16 py-16 mt-24">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-12">

                    {/* Left Text Section */}
                    <div className="max-w-lg">
                        <h1 className="text-5xl font-bold text-gray-800 mb-6">
                        Grow your school supplies business with{" "}
                        <span className="text-black">
                            Re:<span className="text-red-800">Book</span>
                        </span>{" "}
                        today!
                        </h1>
                        <p className="text-lg text-gray-700">
                        Sell your school supplies on Re:Book. Our easy-to-use platform connects
                        you with students, parents, and educators. From notebooks to backpacks,
                        Re:Book helps you boost visibility and grow sales effortlessly.
                        </p>
                    </div>



                    {/* Right Text Section */}

                    <div className="bg-white p-6 rounded-lg shadow-lg w-[25%]">

                            <div className=" flex justify-center items-center">
                                <img src={logo} alt="Logo" className="w-[70%] m-8" />
                            </div>

                            <div className="text-center m-4 font-bold text-2xl">
                                Do you want to register as a seller?
                            </div>

                            <div className="flex flex-row items-center justify-between m-4 mt-12">
                                <Link
                                    href={"/become-a-seller"}
                                    method={"post"}
                                    className="bg-green-600 p-2 px-12 rounded-lg font-bold text-white"
                                >
                                    Yes
                                </Link>

                                <Link
                                    href={"/dashboard"}
                                    method={"get"}
                                    className="bg-red-600 p-2 px-12 rounded-lg font-bold text-white"
                                >
                                    No
                                </Link>
                            </div>



                    </div>




                        {/* Registration Modal */}
                        {/* <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">

                            <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Shop Name"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />


                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="Address (e.g. Sainplice, Apatri, Patna.)"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />

                            <button className="w-full py-3 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition-colors">
                                Register
                            </button>
                            </form>
                        </div> */}

                    </div>
                </main>
        </>
    )
}
