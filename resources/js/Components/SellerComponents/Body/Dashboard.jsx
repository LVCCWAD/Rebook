import React from "react";

export default function Dashboard(){
    return(
        <>
            {/* --- DASHBOARD --- */}
            {/* grid based design */}
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mt-6 max-w-6xl mx-auto">

                {/* --- CONTAINER: TO DO LIST --- */}
                <div className="bg-white p-6 rounded shadow-md col-span-2">
                    <h2 className="text-lg font-semibold mb-4">To Do List</h2>
                    <div className="flex justify-between text-center">
                        <div>
                            <p className="text-xl font-bold">1</p>
                            <p className="text-sm text-gray-600">To-Process Shipment</p>
                        </div>
                        <div>
                            <p className="text-xl font-bold">1</p>
                            <p className="text-sm text-gray-600">Processed Shipment</p>
                        </div>
                        <div>
                            <p className="text-xl font-bold">1</p>
                            <p className="text-sm text-gray-600">Order Delivered</p>
                        </div>
                    </div>
                </div>

                {/* --- CONTAINER: ORDER DETAIL ---*/}
                <div className="bg-white p-6 rounded shadow-md">
                    <h2 className="text-lg font-semibold mb-2">Order Details</h2>
                    <a href="#" className="text-blue-600 font-medium">Check</a>
                    <p className="text-sm text-gray-600">Specifies items, stock, and prices</p>
                </div>

                {/* --- CONTAINER: INSIGHTS ---*/}
                <div className="bg-white p-6 rounded shadow-md col-span-2">
                    <h2 className="text-lg font-semibold mb-4">Business Insights</h2>
                    <div className="flex justify-between text-center">
                        <div>
                            <p className="text-xl font-bold">₱150</p>
                            <p className="text-sm text-gray-600">Sales</p>
                            <p className="text-xs text-gray-500">30.00%</p>
                        </div>
                        <div>
                            <p className="text-xl font-bold">3</p>
                            <p className="text-sm text-gray-600">Orders</p>
                            <p className="text-xs text-gray-500">30.00%</p>
                        </div>
                        <div>
                            <p className="text-xl font-bold">4.8</p>
                            <p className="text-sm text-gray-600">Ratings</p>
                            <p className="text-xs text-gray-500">35.00%</p>
                        </div>
                    </div>
                </div>

                {/* --- CONTAINER: MY PRODUCTS ---*/}
                <div className="bg-white p-6 rounded shadow-md">
                    <h2 className="text-lg font-semibold mb-2">My Products</h2>
                    <a href="#" className="text-blue-600 font-medium">Add New Product</a>
                    <p className="text-sm text-gray-600">Quickly stock up on school essentials.</p>
                </div>
            </div>
        </>
    )
}
