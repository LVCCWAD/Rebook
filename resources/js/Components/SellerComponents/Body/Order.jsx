import React, { useState, useRef, useEffect } from "react";
import logo from "../../../../../public/Assets/logo.png";
import { Link, useForm } from "@inertiajs/react";

const tabs = ["To Ship", "Shipment", "Completed"];

function Order() {
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
  ];

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      {/* <div className="bg-white shadow-md flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-[30%] m-2" />
          <span
            className="text-gray-600 text-sm ml-2 cursor-pointer"
            onClick={() => (window.location.href = "/Sellerdash")}
          >
            Seller View
          </span>
        </div> */}

        {/* Dropdown Navigation */}
        {/* <div className="relative inline-block text-left" ref={dropdownRef}>
          <button onClick={() => setOpen(!open)} className="p-2">
            <div className="grid grid-cols-3 gap-0.5 w-6 h-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="w-1 h-1 bg-[#5a1c1c] rounded-full"></span>
              ))}
            </div>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg p-4 grid grid-cols-2 gap-4 z-50">
              <Link href="/sellerdash" className="flex flex-col items-center">
                <div className="bg-[#7a0d0d] text-white rounded-full p-3 text-xl">🛍️</div>
                <span className="text-xs mt-1 text-center">Seller View</span>
              </Link>

              <Link href="/sellerorder" className="flex flex-col items-center">
                <div className="bg-[#1b6e0b] text-white rounded-full p-3 text-xl">📋</div>
                <span className="text-xs mt-1 text-center">My Orders</span>
              </Link>

              <Link href="/sellerproduct" className="flex flex-col items-center">
                <div className="bg-[#796008] text-white rounded-full p-3 text-xl">🏷️</div>
                <span className="text-xs mt-1 text-center">My Products</span>
              </Link>

              <Link href="/dashboard" className="flex flex-col items-center">
                <div className="bg-[#0d1f7a] text-white rounded-full p-3 text-xl w-[48px] h-[48px]">🛒</div>
                <span className="text-xs mt-1 text-center">Customer View</span>
              </Link>

              <button
                onClick={() => alert("Logging out...")}
                className="flex flex-col items-center cursor-pointer focus:outline-none"
              >
                <div className="bg-gray-600 text-white rounded-full p-3 text-xl">↩️</div>
                <span className="text-xs mt-1 text-center">Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div> */}

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
