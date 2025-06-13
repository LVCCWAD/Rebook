import React, { useState, useEffect } from "react"
import { useForm, router } from '@inertiajs/react'
import logo from "../../../../../public/Assets/logo.png"
import { Link } from "@inertiajs/react"

export default function Register({ user }) {
    const [showCreateShop, setShowCreateShop] = useState(false)
    const { data, setData, post, processing, errors } = useForm({
        shop_name: '',
        description: '',
    })

    useEffect(() => {
        if (user.role === 'seller') {
            setShowCreateShop(true)
        }
    }, [user.role])

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/create-shop', {
            onSuccess: () => {
                router.put('/become-a-seller', {}, {
                    onSuccess: () => console.log('User role updated to seller'),
                    onError: () => console.log('Failed to update user role'),
                })
            },
            onError: () => {
                console.log('Shop creation failed')
            },
        })
    }

    return (
        <>
            <main className="mx-auto px-4 mt-20 sm:mt-24 md:mt-32 lg:mt-40 max-w-7xl">
                {/* Changed to flex-col for small screens, lg:flex-row for larger */}
                <div className="flex flex-col lg:flex-row justify-around items-center lg:items-start space-y-10 lg:space-y-0 lg:space-x-10">
                    <div className="max-w-xl text-center lg:text-left">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
                            Grow your school supplies business with{" "}
                            <span className="text-black">
                                Re:<span className="text-red-800">Book</span>
                            </span>{" "}
                            today!
                        </h1>
                        <p className="text-base sm:text-lg text-gray-700">
                            Sell your school supplies on Re:Book. Our easy-to-use platform connects
                            you with students, parents, and educators. From notebooks to backpacks,
                            Re:Book helps you boost visibility and grow sales effortlessly.
                        </p>
                    </div>

                    {/* Section for "Do you want to register as a seller?" */}
                    {!showCreateShop && (
                        <section className="bg-white p-6 rounded-xl shadow-md w-full max-w-xs sm:max-w-md flex flex-col items-center">
                            <div className="flex justify-center items-center">
                                <img src={logo} alt="Logo" className="w-2/3 sm:w-1/2 m-4 sm:m-8" />
                            </div>
                            <div className="text-center m-4 font-bold text-xl sm:text-2xl">
                                Do you want to register as a seller?
                            </div>
                            {/* Buttons: flex-col on smaller screens, flex-row on sm and above */}
                            <div className="flex flex-col sm:flex-row items-center justify-between w-full m-4 mt-8 sm:mt-12 space-y-4 sm:space-y-0 sm:space-x-4">
                                <Link
                                    href={"/become-a-seller"}
                                    method={"put"}
                                    className="bg-green-600 rounded-xl font-bold text-white shadow-md flex-grow text-center py-3 px-8 transition duration-300 hover:bg-green-700"
                                >
                                    Yes
                                </Link>
                                <Link
                                    href="/dashboard"
                                    method="get"
                                    className="bg-red-600 rounded-xl font-bold text-white shadow-md flex-grow text-center py-3 px-8 transition duration-300 hover:bg-red-700"
                                >
                                    No
                                </Link>
                            </div>
                        </section>
                    )}

                    {/* Shop Creation Form */}
                    {showCreateShop && (
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white p-4 sm:p-6 w-full max-w-xs sm:max-w-md rounded-xl shadow-md"
                        >
                            <div className="m-2 text-xl sm:text-2xl font-bold">Shop</div>
                            <input
                                type="text"
                                placeholder="Enter your shop name"
                                value={data.shop_name}
                                onChange={(e) => setData('shop_name', e.target.value)}
                                className="border border-gray-300 bg-white shadow-md rounded-xl p-3 sm:p-4 w-full mb-3 sm:mb-4 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.shop_name && (
                                <div className="text-red-500 text-sm mt-1">{errors.shop_name}</div>
                            )}
                            <div className="m-2 text-xl sm:text-2xl font-bold">Description</div>
                            <textarea
                                placeholder="Optional description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="border border-gray-300 bg-white shadow-md p-3 sm:p-4 rounded-xl w-full mt-2 focus:ring-blue-500 focus:border-blue-500"
                                rows={4}
                            />
                            {errors.description && (
                                <div className="text-red-500 text-sm mt-1">{errors.description}</div>
                            )}
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white mt-4 p-2 px-6 rounded hover:bg-blue-700 w-full transition duration-300"
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
