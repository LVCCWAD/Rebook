import react from "react";
import React, { useState, useEffect } from "react";

function CartProduct({ user, cart, cart_Items }){

      const [cartItems, setCartItems] = useState([]);

      // Load cart items from props when component mounts or when cart_Items changes
      useEffect(() => {
        if (cart_Items && cart_Items.length > 0) {
          // Transform backend data to match our component's data structure if needed
          const formattedItems = cart_Items.map(item => ({
            ...item,
            selected: false // Add selected property which is needed for the UI
          }));
          setCartItems(formattedItems);
        }
      }, [cart_Items]);

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

      // quantity decrease primary key
      const decreaseQuantity = (id) => {
        setCartItems(cartItems.map(item =>
          item.id === id && item.quantity > 1 ? {...item, quantity: item.quantity - 1} : item
        ));
      };

      // Handle item deletion
      const deleteSelectedItems = () => {
        setCartItems(cartItems.filter(item => !item.selected));
        setAllSelected(false);
      };

      // Delete a single item
      const deleteItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
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
              <button
                onClick={deleteSelectedItems}
                className="flex items-center text-gray-500 text-sm"
              >
                DELETE
              </button>
            </div>

            {/* Cart Items */}
            {cartItems.length > 0 ? cartItems.map(item => (
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
                              <span className="bg-orange-100 px-2 rounded text-xs">Flash Sale</span>
                              <span className="ml-1 bg-gray-100 text-gray-600 px-2 rounded text-xs">₱ Flash Sale ₱ {item.weight}</span>
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
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            Delete
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
                          -
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
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="bg-white p-8 rounded-md shadow-sm text-center">
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            )}
          </div>
        </>
    )
}

export default CartProduct
