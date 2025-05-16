import React, { useState } from "react";

import logo from "../../../../../public/Assets/logo.png";

export default function Register(){
    const [showModal, setShowModal] = useState(true);

    return(
        <>
      <div className="h-auto">
      {/* Header */}
      {/* <header className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-300">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
                    <img src={logo} alt="Logo" className="w-[30%] m-2" />
                    <span className="text-gray-600 text-sm ml-2 cursor-pointer">
                      Seller View
                    </span>
                  </div>
        </div>

        <div className="flex items-center space-x-2 text-gray-800">
          <span className="font-medium">Back to Home page</span>
        </div>
      </header> */}

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

          {/* Registration Modal */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center mb-6">
              <div className=" flex justify-center items-center">
              <img src={logo} alt="Logo" className="w-[30%] m-2" />
              </div>
            </div>

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
          </div>
        </div>
      </main>
    </div>
        </>
    )
}
