import React, { useState } from "react";

export default function Body(){
        // extract data to backend

        // cart table
        const [cartItems, setCartItems] = useState([
            {
              id: 1,
              seller: "sharke Mother & Baby",
              name: "Mixed Nuts 7In1 Trail Daily Nuts Dried Fruits and Nuts Ready to Eat Nuts Healthy Snack Slimming",
              price: 137.33,
              quantity: 1,
              isFlashSale: true,
              weight: "250g",
              promo: "Buy 2 Get additional 1% off",
              image: "/api/placeholder/80/80",
              selected: false
            },
            {
              id: 2,
              seller: "vivibag shop",
              name: "VIVI#030 KOREAN FASHION SHOULDER BAG FOR WOMEN",
              price: 110.01,
              quantity: 1,
              color: "Blue",
              image: "/api/placeholder/80/80",
              selected: false
            }
          ]);

          // get all the user cart product
          const [allSelected, setAllSelected] = useState(false);

          // how this works?
          const toggleSelectAll = () => {
            const newState = !allSelected;
            setAllSelected(newState);
            setCartItems(cartItems.map(item => ({...item, selected: newState})));
          };

          // how?
          const toggleSelectItem = (id) => {
            const updatedItems = cartItems.map(item =>
              item.id === id ? {...item, selected: !item.selected} : item
            );
            setCartItems(updatedItems);

            // Update all selected state
            setAllSelected(updatedItems.every(item => item.selected));
          };

          // quantity increase primary key
          const increaseQuantity = (id) => {
            setCartItems(cartItems.map(item =>
              item.id === id ? {...item, quantity: item.quantity + 1} : item
            ));
          };

          // quantity increase primary key
          const decreaseQuantity = (id) => {
            setCartItems(cartItems.map(item =>
              item.id === id && item.quantity > 1 ? {...item, quantity: item.quantity - 1} : item
            ));
          };

        // selected item into jsx view
          const selectedItemCount = cartItems.filter(item => item.selected).length;

        // calculate all the product
          const calculateSubtotal = () => {
            return cartItems
              .filter(item => item.selected)
              .reduce((total, item) => total + (item.price * item.quantity), 0);
          };

        // return jsx view
          const subtotal = calculateSubtotal();

    return(
        <>
            {/* --- CART --- */}
            <div className="mx-[10%]">

            <div className="w-full p-4 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Left Side - Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                    {/* Select All Header */}
                    <div className="bg-white p-4 flex items-center justify-between rounded-md shadow-sm">
                        <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={allSelected}
                            onChange={toggleSelectAll}
                            className="w-4 h-4 accent-orange-500"
                        />
                        <span className="text-sm text-gray-700">SELECT ALL ({cartItems.length} ITEM{cartItems.length !== 1 ? 'S' : ''})</span>
                        </div>
                        <button className="flex items-center text-gray-500 text-sm">
                        {/* <Trash2 size={16} className="mr-1" /> */}
                        DELETE
                        </button>
                    </div>

                    {/* Cart Items */}
                    {cartItems.map(item => (
                        <div key={item.id} className="bg-white rounded-md shadow-sm overflow-hidden">
                        {/* Seller Info */}
                        <div className="flex items-center p-4 border-b border-gray-100">
                            <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={() => toggleSelectItem(item.id)}
                            className="w-4 h-4 accent-orange-500 mr-2"
                            />
                            <div className="flex items-center text-sm font-medium">
                            {item.seller === "sharke Mother & Baby" && (
                                <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-1">M</span>
                            )}
                            <span>{item.seller}</span>
                            {/* <ChevronRight size={16} className="ml-1 text-gray-400" /> */}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-4 flex">
                            <div className="w-20 h-20 flex-shrink-0">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                            </div>

                            <div className="ml-4 flex-grow">
                            <div className="flex justify-between">
                                <div className="space-y-2">
                                {/* Product Tags and Name */}
                                <div>
                                    {item.isFlashSale && (
                                    <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded mr-1">5.5</span>
                                    )}
                                    <span className="text-sm">{item.name}</span>
                                </div>

                                {/* Product Details */}
                                <div className="text-xs text-gray-500 space-y-1">
                                    {item.color && <div>{item.color}</div>}
                                    {item.weight && <div>{item.weight}</div>}
                                    {item.isFlashSale && (
                                    <div className="flex items-center">
                                        <span className="bg-orange-100  px-2 rounded text-xs">Flash Sale</span>
                                        <span className="ml-1 bg-gray-100 text-gray-600 px-2 rounded text-xs">₱ Flash Sale ₱ 250g</span>
                                    </div>
                                    )}
                                    {item.promo && (
                                    <div className="bg-blue-100 text-blue-600 px-2 rounded text-xs inline-block">
                                        {item.promo}
                                    </div>
                                    )}
                                </div>
                                </div>

                                {/* Price and Actions */}
                                <div className="text-right space-y-2">
                                <div className="text-red-700 font-medium">₱{item.price.toFixed(2)}</div>
                                <div className="flex items-center justify-end space-x-2">
                                    <button>
                                    {/* <Heart size={16} className="text-gray-400" /> */}
                                    </button>
                                    <button>
                                    {/* <Trash2 size={16} className="text-gray-400" /> */}
                                    </button>
                                </div>
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="flex justify-end mt-2">
                                <div className="flex items-center border border-gray-300 rounded-sm">
                                <button
                                    onClick={() => decreaseQuantity(item.id)}
                                    className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                                >
                                    {/* <Minus size={14} /> */}
                                </button>
                                <input
                                    type="text"
                                    value={item.quantity}
                                    readOnly
                                    className="w-10 text-center border-l border-r border-gray-300"
                                />
                                <button
                                    onClick={() => increaseQuantity(item.id)}
                                    className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                                >
                                    {/* <Plus size={14} /> */}
                                </button>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>

                    {/* Right Side - Order Summary */}
                    <div className="space-y-4">
                    {/* Location */}
                    <div className="bg-white p-4 rounded-md shadow-sm">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Location</h3>
                        <button className="flex items-center text-blue-600 hover:text-blue-700">
                        {/* <MapPin size={18} className="mr-2" /> */}
                        <span>Add Shipping Address</span>
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-4 rounded-md shadow-sm">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Order Summary</h3>

                        <div className="space-y-2 pb-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal ({selectedItemCount} items)</span>
                            <span className="font-medium">₱{subtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-600">Shipping Fee</span>
                            <span className="font-medium">₱0.00</span>
                        </div>
                        </div>

                        {/* Voucher Input */}
                        <div className="flex mt-4 mb-4">
                        <input
                            type="text"
                            placeholder="Enter Voucher Code"
                            className="flex-grow border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 uppercase text-sm font-medium">
                            Apply
                        </button>
                        </div>

                        {/* Total */}
                        <div className="border-t pt-3">
                        <div className="flex justify-between">
                            <span className="text-gray-700 font-medium">Subtotal</span>
                            <div className="text-right">
                            <div className="text-red-700 font-bold">₱{subtotal.toFixed(2)}</div>
                            <div className="text-xs text-gray-500">VAT included, where applicable</div>
                            </div>
                        </div>
                        </div>

                        {/* Checkout Button */}
                        <button className="w-full bg-red-700 text-white py-3 rounded mt-4 font-medium hover:bg-red-400 transition">
                        PROCEED TO CHECKOUT({selectedItemCount})
                        </button>
                    </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}
