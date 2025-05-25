import React from "react";

function CartItem({ item, toggleSelectItem, increaseQuantity, decreaseQuantity, deleteItem, handleQuantityChange }) {
  return (
    <section className="m-4 ">
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
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 bg-gray-400 rounded-xl shadow-md object-cover"
        />

        <div className="m-4 flex-grow">
          <div className="flex justify-between">
            <div>
              <p className="text-lg">{item.name}</p>
              {item.description && <p className="text-md text-gray-500">{item.description}</p>}
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
                disabled={item.quantity < 1}
                className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:text-gray-300"
              >
                -
              </button>

              <input
                type="number"
                min="1"
                value={item.pivot.quantity}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
              />

              <button
                onClick={() => increaseQuantity(item.id, item.pivot.quantity)}
                disabled={item.quantity < 1}
                className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:text-gray-300"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartItem;
