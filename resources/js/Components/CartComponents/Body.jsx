import React, { useState, useEffect } from "react";
import { useForm, router } from "@inertiajs/react";


function Body({ user, cart, cart_Items }) {
    console.log('=-=-=-==-=-=-=-=-=-=-==-=-===-=-=-=--')
    console.log(cart_Items)

const [cartItems, setCartItems] = useState([]);
const updateForm = useForm({
  id: null,
  quantity: 0
});

// Load cart items from props when component mounts
useEffect(() => {
    if (cartItems.length === 0 && cart_Items?.length > 0) {
        const formattedItems = cart_Items.map(item => ({
            ...item,
            selected: false
        }));
        setCartItems(formattedItems);
    }
}, [cart_Items]); // Only depend on cart_Items prop, not updateForm.data

// WORKING: delete form
const deleteForm = useForm({});

// WORKING: Form for clearing all selected items
const clearForm = useForm({});

// WORKING: get all the user cart product
const [allSelected, setAllSelected] = useState(false);

// Toggle select all items
const toggleSelectAll = () => {
  const newState = !allSelected;
  setAllSelected(newState);
  setCartItems(cartItems.map(item => ({...item, selected: newState})));
};

// Toggle selection for a single item
const toggleSelectItem = (id) => {
  const updatedItems = cartItems.map(item =>
    item.id === id ? {...item, selected: !item.selected} : item
  );
  setCartItems(updatedItems);

  // Update all selected state
  setAllSelected(updatedItems.every(item => item.selected));
};

// Increase quantity for an item
const increaseQuantity = (id) => {
  console.log('Increasing quantity for item:', id);

  const item = cartItems.find(i => i.id === id);
  if (!item || !item.pivot || typeof item.pivot.quantity !== 'number') {
    console.warn('❌ Item not found or invalid pivot structure:', item);
    return;
  }

  const currentQty = item.pivot.quantity;
  console.log('Current quantity:', currentQty);

  // Check if we have enough stock to increase quantity
  if (currentQty >= item.stock) {
    console.warn(`❌ Cannot increase quantity beyond available stock (${item.stock})`);
    // Optionally show an alert or notification to the user
    alert(`Sorry, only ${item.stock} units available in stock.`);
    return;
  }

  const newQty = currentQty + 1;
  console.log('New quantity:', newQty);

  // First update local state for immediate UI feedback
  setCartItems(prev =>
    prev.map(i =>
      i.id === id
        ? { ...i, pivot: { ...i.pivot, quantity: newQty } }
        : i
    )
  );

  // Then update on server
  updateQuantity(id, newQty);
};

// Decrease quantity for an item
const decreaseQuantity = (id) => {
  const item = cartItems.find(i => i.id === id);
  if (!item || !item.pivot || typeof item.pivot.quantity !== 'number') {
    console.warn('❌ Item not found or invalid pivot structure:', item);
    return;
  }

  const currentQty = item.pivot.quantity;
  const newQty = Math.max(1, currentQty - 1); // Ensure quantity doesn't go below 1

  // First update local state for immediate UI feedback
  setCartItems(prev =>
    prev.map(i =>
      i.id === id
        ? { ...i, pivot: { ...i.pivot, quantity: newQty } }
        : i
    )
  );

  // Then update on server
  updateQuantity(id, newQty);
};

// Core function to update quantity on server
const updateQuantity = (id, quantity) => {
  console.log(`🟡 Updating item ${id} to quantity: ${quantity}`);

  // Store original state for rollback
  const originalCartItems = [...cartItems];

  // Using direct key-value pairs for Inertia form data
  updateForm.data.id = id;
  updateForm.data.quantity = quantity;

  // Log form data after direct assignment
  console.log("✅ Form data to be sent:", updateForm.data);

  // Send update to server
  updateForm.put(`/cart/${id}/update`, {
    preserveScroll: true,
    onSuccess: () => {
      console.log(`✅ Server confirmed quantity ${quantity} for item ${id}`);
      setTimeout(() => {
        router.reload({ only: ['Carts'] });
      }, 300);
    },
    onError: (errors) => {
      console.warn(`❌ Failed to update item ${id}:`, errors);
      // Rollback to previous state on error
      setCartItems(originalCartItems);
    }
  });
};

// Handle item deletion
const deleteSelectedItems = () => {
  // Get all selected item IDs
  const selectedIds = cartItems
    .filter(item => item.selected)
    .map(item => item.id);

  if (selectedIds.length > 0) {
    clearForm.delete('/cart/clear', {
      preserveScroll: true,
      onSuccess: () => {
        setCartItems(cartItems.filter(item => !item.selected));
        setAllSelected(false);
      }
    });
  }
};

// Delete a single item
const deleteItem = (id) => {
  deleteForm.delete(`/cart/${id}/remove`, {
    preserveScroll: true,
    onSuccess: () => {
      setCartItems(cartItems.filter(item => item.id !== id));
    }
  });
};

// Handle quantity input changes
const handleQuantityChange = (id, value) => {
  const cleanValue = value.replace(/[^\d]/g, ""); // Remove non-digits
  const numValue = parseInt(cleanValue, 10) || 1;

  const item = cartItems.find(i => i.id === id);
  if (!item) return;

  // Cap the quantity at the available stock
  const quantity = Math.min(Math.max(1, numValue), item.stock);

  // If user tried to enter a value higher than stock, warn them
  if (numValue > item.stock) {
    alert(`Sorry, only ${item.stock} units available in stock.`);
  }

  setCartItems(prevItems =>
    prevItems.map(item =>
      item.id === id
        ? {
            ...item,
            pivot: {
              ...item.pivot,
              quantity,
            },
          }
        : item
    )
  );
};

// Handle input blur to update server
const handleQuantityBlur = (id) => {
  const item = cartItems.find(item => item.id === id);
  if (item) {
    updateQuantity(id, item.pivot.quantity);
  }
};

// Calculate totals
const selectedItemCount = cartItems.filter(item => item.selected).length;

const calculateSubtotal = () => {
  return cartItems
    .filter(item => item.selected)
    .reduce((total, item) => total + (item.price * item.pivot.quantity), 0);
};

const subtotal = calculateSubtotal();
  return(
    <>
      <div className="max-w-4xl mx-auto p-4">
        {/* Header with selection controls */}
        <div className="flex justify-between items-center mb-4 p-3 bg-white border border-gray-200 rounded">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
              className="w-4 h-4 mr-2"
            />
            <span>Select All ({cartItems.length})</span>
          </div>
          <button
            onClick={deleteSelectedItems}
            disabled={!selectedItemCount}
            className="text-red-600 hover:text-red-800 disabled:text-gray-400"
          >
            Delete
          </button>
        </div>

        {/* Cart Items */}
        {cartItems.length > 0 ? (
          <div className="space-y-4">

            {cartItems.map(item => (
              <div key={item.id} className="p-4 bg-white border border-gray-200 rounded">
                {/* Seller info */}
                <div className="flex items-center pb-2 border-b border-gray-100">
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => toggleSelectItem(item.id)}
                    className="w-4 h-4 mr-2"
                  />
                  <span className="text-sm">{item.seller}</span>
                </div>

                {/* Product details */}
                <div className="flex mt-2">
                  <div className="w-16 h-16">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="ml-3 flex-grow">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm">{item.name}</p>
                        {item.weight && <p className="text-xs text-gray-500">{item.weight}</p>}
                        {item.color && <p className="text-xs text-gray-500">{item.color}</p>}
                      </div>
                      <div className="text-right">
                        <p className="text-red-600 font-medium">₱{item.price.toFixed(2)}</p>

                        <button
                          onClick={() => deleteItem(item.id)}
                          className="text-sm text-gray-500 hover:text-red-600"
                        >
                          Delete
                        </button>

                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex justify-end mt-2">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() => decreaseQuantity(item.id, item.pivot.quantity)}
                          disabled={item.quantity <= 1}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:text-gray-300"
                        >
                          -
                        </button>

                        <input
                            type="number"
                            min="1"
                            value={item.pivot.quantity}
                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            onBlur={() => handleQuantityBlur(item.id)}
                        />

                        <button
                          onClick={() => increaseQuantity(item.id, item.pivot.quantity)}
                          disabled={item.quantity <= 1}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:text-gray-300"
                        >
                          +
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white border border-gray-200 rounded">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        )}

        {/* Order Summary */}
        <div className="mt-6 p-4 bg-white border border-gray-200 rounded">
          <h3 className="font-medium mb-3">Order Summary</h3>

          <div className="flex justify-between mb-2">
            <span>Subtotal ({selectedItemCount} items)</span>
            <span>₱{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-4">
            <span>Shipping Fee</span>
            <span>₱0.00</span>
          </div>

          <div className="border-t pt-3 flex justify-between">
            <span className="font-medium">Total</span>
            <span className="font-bold text-red-600">₱{subtotal.toFixed(2)}</span>
          </div>

          <button
            disabled={selectedItemCount === 0}
            className={`w-full mt-4 py-2 rounded font-medium ${
              selectedItemCount > 0
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Checkout ({selectedItemCount})
          </button>
        </div>
      </div>
    </>
  )
}

export default Body
