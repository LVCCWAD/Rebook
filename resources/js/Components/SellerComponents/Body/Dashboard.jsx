import React, { useEffect, useState } from "react";

export default function Dashboard({ setCurrentComponent, orders, overallRating }) {
    console.log('orders', orders);

    // State to track statistics
    const [stats, setStats] = useState({
        pendingOrders: 0,
        cancelledOrders: 0,
        completedOrders: 0,
        totalSales: 0,
        totalOrders: 0
    });

    // useEffect to recalculate statistics when orders change
    useEffect(() => {
        if (orders && orders.length > 0) {
            const pendingOrders = orders.filter(order => order.status === 'pending').length;
            const cancelledOrders = orders.filter(order => order.status === 'cancelled').length;
            const completedOrders = orders.filter(order => order.status === 'completed').length;
            const totalSales = orders
                .filter(order => order.status === 'completed')
                .reduce((sum, order) => sum + order.total, 0);
            const totalOrders = orders.length;

            setStats({
                pendingOrders,
                cancelledOrders,
                completedOrders,
                totalSales,
                totalOrders
            });
        } else {
            // Reset stats if no orders
            setStats({
                pendingOrders: 0,
                cancelledOrders: 0,
                completedOrders: 0,
                totalSales: 0,
                totalOrders: 0
            });
        }
    }, [orders]); // Dependency array - runs when orders change

    const handleClick = (target) => {
        setCurrentComponent(target); // Calls parent directly
    }

    return(
        <>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-20">

                {/* --- CONTAINER: TO DO LIST --- */}
                <div className="bg-white p-6 rounded-xl shadow-md col-span-2">
                    <h2 className="text-lg font-semibold mb-4">To Do List</h2>
                    <div className="flex justify-between text-center">
                        <div>
                            {/* Count all seller pending orders */}
                            <p className="text-xl font-bold">{stats.pendingOrders}</p>
                            <p className="text-sm text-gray-600">To-Process Shipment</p>
                        </div>
                        <div>
                            {/* Count all seller cancelled orders */}
                            <p className="text-xl font-bold">{stats.cancelledOrders}</p>
                            <p className="text-sm text-gray-600">Cancelled Orders</p>
                        </div>
                        <div>
                            {/* Count all completed orders */}
                            <p className="text-xl font-bold">{stats.completedOrders}</p>
                            <p className="text-sm text-gray-600">Order Completed</p>
                        </div>
                    </div>
                </div>

                {/* --- CONTAINER: ORDER DETAIL ---*/}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-lg font-semibold mb-2">Order Details</h2>

                    <button onClick={() => handleClick('order')} className="text-blue-600 font-medium">Check</button>

                    <p className="text-sm text-gray-600">Specifies items, stock, and prices</p>
                </div>

                {/* --- CONTAINER: INSIGHTS ---*/}
                <div className="bg-white p-6 rounded-xl shadow-md col-span-2">
                    <h2 className="text-lg font-semibold mb-4">Business Insights</h2>
                    <div className="flex justify-between text-center">
                        <div>
                            {/* Calculate the total price of completed orders */}
                            <p className="text-xl font-bold">₱{stats.totalSales}</p>
                            <p className="text-sm text-gray-600">Sales</p>
                        </div>
                        <div>
                            {/* Count all the orders made by seller */}
                            <p className="text-xl font-bold">{stats.totalOrders}</p>
                            <p className="text-sm text-gray-600">Orders made</p>
                        </div>
                        <div>
                            {/* Calculate the overall rating of seller */}
                            <p className="text-xl font-bold">{overallRating || 0}</p>
                            <p className="text-sm text-gray-600">Ratings</p>
                        </div>
                    </div>
                </div>

                {/* --- CONTAINER: MY PRODUCTS ---*/}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-lg font-semibold mb-2">My Products</h2>

                    <button onClick={() => handleClick('product')} className="text-blue-600 font-medium">
                        Add New Product
                    </button>

                    <p className="text-sm text-gray-600">Quickly stock up on school essentials.</p>
                </div>
            </div>
        </>
    )
}
