import React, { use, useState } from "react";

import bag from "../../../../../public/Assets/Dashboard/Category/bag.png"


function Product({ product }){

    console.log('HERE---> ', product)


    // logic to retrive single product

    // object state
    const [quantity, setQuantity] = useState(1) // default quantity 1
    const [selectedColor, setSelectedColor] = useState("blue") // default color

    // decrease quantity logic
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1); // can not be zero
    };

    // increase quantity logic
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    // set color
    const colors = [
        { name: "Red", bg: "bg-red-500" },
        { name: "Black", bg: "bg-gray-800" },
        { name: "Blue", bg: "bg-blue-500" },
        { name: "Brown", bg: "bg-amber-700" }
    ];


    return(
        <>
            {/* --- PRODUCT VIEW --- */}
            <div className="border w-full h-150 flex flex-row">

                {/* --- LEFT CONTAINER --- */}
                <div className="w-[40%]">

                    {/* --- IMAGE --- */}
                    <div className="border flex justify-center items-start bg-gray-100 overflow-hidden m-4">
                        <img
                        src={bag}
                        alt="IMAGE"
                        className="w-140 object-cover"
                        />
                    </div>
                </div>

                {/* --- RIGHT CONTAINER --- */}
                <div className="flex flex-col justify-between w-[60%] m-4">
                    <h1 className="text-xl md:text-2xl font-semibold text-gray-800">{product?.name}</h1>

                    <div className="flex items-center mt-2">
                        <div className="flex items-center">
                            {/* star here */}
                            <span className="ml-1 text-yellow-500 font-medium">4.8</span>
                        </div>
                        <span className="mx-2 text-gray-300">|</span>
                        <span className="text-gray-500">Ratings 250</span>
                    </div>

                    <div className="mt-2 text-sm text-gray-600">
                        Brand: No Brand | <span className="text-blue-500">More Women Bags from No Brand</span>
                    </div>

                        {/* --- BANNER --- */}
                        {/* <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-3 text-white flex items-center justify-between">
                            <div className="flex items-center gap-2">
                            <div className="text-2xl font-bold">5.5</div>
                            <div className="text-xs">
                                <div>SULITIPAYO</div>
                                <div>MAY 4 (8PM - 7)</div>
                            </div>
                            </div>
                            <div>
                            <div className="text-lg font-bold">UP TO ₱1,500 OFF</div>
                            <div className="text-xs text-right">Shop Now!</div>
                            </div>
                        </div> */}

{/* Price */}
<div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-pink-600">₱110.01</span>
            <span className="text-gray-500 line-through text-sm">₱1,000.00</span>
            <span className="bg-pink-100 text-pink-600 px-2 rounded text-sm font-medium">-89%</span>
          </div>

          {/* Delivery Options */}
          <div className="space-y-4 border-t border-b py-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Options:</span>
              <div className="flex items-center">
                {/* <MapPin size={16} className="text-blue-500 mr-1" /> */}
                <span className="text-sm">Metro Manila-Quezon City, Quezon City, Project 6</span>
                <span className="text-blue-500 ml-2 text-sm font-medium">CHANGE</span>
              </div>
            </div>

            {/* <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Package size={16} className="text-blue-500 mr-1" />
                <span className="text-sm">Guaranteed by Thurs, 8 May</span>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
              <span className="text-gray-500 text-sm">Priority 48H with shipping fee ₱40.00</span>
            </div> */}

            {/* <div className="flex justify-between items-center">
              <div className="flex items-center">
                <RefreshCw size={16} className="text-blue-500 mr-1" />
                <span className="text-sm">Change of mind returns • 7 Days Free Returns • Warranty not available</span>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </div> */}
          </div>

          {/* Color Selection */}
          {/* <div>
            <span className="text-gray-600">Color Family:</span>
            <div className="flex gap-2 mt-2"> */}

                {/* display multiple element */}
              {/* {colors.map(color => (
                <button
                  key={color.name}
                  className={`flex items-center justify-center  w-12 h-12 border-2 ${selectedColor === color.name ? 'border-pink-500' : 'border-gray-200'}`}
                  onClick={() => setSelectedColor(color.name)}
                >
                  <div className={`${color.bg} w-10 h-5 `}></div>
                </button>
              ))}
            </div>
          </div> */}

           {/* Quantity */}
           <div>
            <span className="text-gray-600">Quantity:</span>
            <div className="flex items-center mt-2">
              <button
                onClick={decreaseQuantity}
                className="border border-gray-300 rounded-l p-2 hover:bg-gray-100"
              >
                {/* <Minus size={16} /> */}-
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="border-t border-b border-gray-300 py-2 w-12 text-center"
              />
              <button
                onClick={increaseQuantity}
                className="border border-gray-300 rounded-r p-2 hover:bg-gray-100"
              >
                {/* <Plus size={16} /> */}+
              </button>
            </div>
          </div>

 {/* Action Buttons */}
 <div className="flex gap-4 pt-4">
            <button className="flex-1 border border-pink-500 text-pink-500 py-3 rounded-lg font-medium hover:bg-pink-50 transition">
              Buy Now
            </button>
            <button className="flex-1 bg-pink-500 text-white py-3 rounded-lg font-medium hover:bg-pink-600 transition">
              Add to Cart
            </button>
          </div>
                </div>
            </div>
        </>
    )
}

export default Product
