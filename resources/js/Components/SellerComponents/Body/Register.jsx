import React, { useState, useEffect } from "react";
import { useForm, router } from '@inertiajs/react';
import logo from "../../../../../public/Assets/logo.png";
import { Link } from "@inertiajs/react";

export default function Register({user}){
    const [showCreateShop, setShowCreateShop] = useState(false)
    const { data, setData, post, processing, errors } = useForm({
        shop_name: '',
        description: '', // optional if you use description
    });

    useEffect(() => {
        if (user.role === 'seller') {
            setShowCreateShop(true);
        }
    }, [user.role]);

    const handleSubmit = (e) => {
        e.preventDefault();

        post('/create-shop', {
            onSuccess: () => {
            router.put('/become-a-seller', {}, {
                onSuccess: () => console.log('User role updated to seller'),
                onError: () => console.log('Failed to update user role'),
            });
            },
            onError: () => {
            console.log('Shop creation failed');
            },
        });
    };

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
                        {!showCreateShop && (
                            <section className="bg-white p-6 rounded-lg shadow-lg w-[25%] flex flex-col">
                                <div className="flex justify-center items-center">
                                    <img src={logo} alt="Logo" className="w-[70%] m-8" />
                                </div>

                                <div className="text-center m-4 font-bold text-2xl">
                                    Do you want to register as a seller?
                                </div>

                                <div className="flex flex-row items-center justify-between m-4 mt-12">
                                    <Link
                                        href={"/become-a-seller"}
                                        method={"put"}
                                        className="bg-green-600 p-2 px-12 rounded-lg font-bold text-white"
                                    >
                                    Yes
                                    </Link>

                                    <Link
                                    href="/dashboard"
                                    method="get"
                                    className="bg-red-600 p-2 px-12 rounded-lg font-bold text-white"
                                    >
                                    No
                                    </Link>
                                </div>
                            </section>
                        )}

                        {showCreateShop && (
                            <form
                            onSubmit={handleSubmit}
                            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto"
                            >
                                <input
                                    type="text"
                                    placeholder="Enter your shop name"
                                    value={data.shop_name}
                                    onChange={(e) => setData('shop_name', e.target.value)}
                                    className="border border-gray-300 p-2 rounded w-full"
                                />
                                {errors.shop_name && (
                                    <div className="text-red-500 text-sm mt-1">{errors.shop_name}</div>
                                )}

                                <textarea
                                    placeholder="Optional description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="border border-gray-300 p-2 rounded w-full mt-4"
                                />
                                {errors.description && (
                                    <div className="text-red-500 text-sm mt-1">{errors.description}</div>
                                )}

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 text-white mt-4 p-2 px-6 rounded hover:bg-blue-700"
                                >
                                    {processing ? 'Submitting...' : 'Submit'}
                                </button>
                            </form>
                        )}
                    </div>
                </main>
        </>
    )
}
