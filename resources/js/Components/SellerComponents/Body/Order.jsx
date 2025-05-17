import React, { useState, useRef, useEffect } from "react";
import logo from "../../../../../public/Assets/logo.png";
import { Link, useForm } from "@inertiajs/react";

const tabs = ["To Ship", "Shipment", "Completed"];

function Order({user_order_id, products}) {

    const [activeTab, setActiveTab] = useState("To Ship");
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const orders = [
        {
            id: 1,
            productImage: "https://via.placeholder.com/100",
            productName: "45×18×29cm nk fashion high school grade travel work backpack",
            total: 450,
            status: "Unpaid",
            shipped: false,
            buyer: "kagemethjayrath",
        },
        {
            id: 2,
            productImage: "https://via.placeholder.com/100",
            productName: "45×18×29cm nk fashion high school grade travel work backpack",
            total: 300,
            status: "paid",
            shipped: false,
            buyer: "machinegun",
        },
    ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Tabs */}
      <div className="max-w-4xl mx-auto mt-6">
        <h2 className="text-2xl font-semibold mb-4">Order Details</h2>

        <div className="flex space-x-4 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded ${
                activeTab === tab ? "bg-white shadow font-bold" : "bg-gray-200 text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table Headers */}
        <div className="bg-white rounded-t-md grid grid-cols-4 text-sm font-semibold text-gray-700 p-3 border-b">
          <span>Product(s)</span>
          <span>Order Total</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-b-md">
          {orders.map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-4 items-center text-sm text-gray-800 border-b px-3 py-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={order.productImage}
                  alt={order.productName}
                  className="w-14 h-14 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{order.buyer}</p>
                  <p className="text-xs">{order.productName}</p>
                </div>
              </div>
              <span className="font-semibold">₱{order.total}</span>
              <span>{order.status}</span>
              <span className="text-sm font-medium text-gray-700">

                <select
                  id={`status-${order.id}`}
                  defaultValue={order.shipped ? "Completed" : "Preparing order"}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring focus:border-blue-300"
                  onChange={(e) => {
                    // You can handle the change here (e.g. update order status in backend)
                    console.log(`Order ${order.id} new status: ${e.target.value}`);
                  }}
                >
                  <option value="Preparing order">Preparing order</option>
                  <option value="Pick by logistic">Pick by logistic</option>
                  <option value="On the way">On the way</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Completed">Completed</option>
                </select>
              </span>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order
