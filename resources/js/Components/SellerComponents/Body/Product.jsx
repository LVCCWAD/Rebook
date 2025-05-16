import React, { useState, useRef, useEffect } from "react";
import logo from "../../../../../public/Assets/logo.png";
import { Link } from "@inertiajs/react";

function Product() {
  const [open, setOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: 0, stock: 0, description: "", category: "" });
  const [editingProduct, setEditingProduct] = useState(null);

  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddProduct = () => {
    const id = Date.now();
    setProducts([...products, { id, ...newProduct, image: "/api/placeholder/100/100" }]);
    setNewProduct({ name: "", price: 0, stock: 0, description: "", category: "" });
    setShowAddModal(false);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    setProducts(products.map(p => (p.id === editingProduct.id ? editingProduct : p)));
    setEditingProduct(null);
    setShowEditModal(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
          {/* Header */}
          {/* <div className="bg-white shadow-md flex justify-between items-center px-6 py-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="w-[30%] m-2" />
              <span className="text-gray-600 text-sm ml-2 cursor-pointer" onClick={() => window.location.href = "/Sellerdash"}>
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
                  <button
                    className="flex flex-col items-center cursor-pointer focus:outline-none"
                  >
                    <Link href="/sellerdash" className="flex flex-col items-center">
                    <div className="bg-[#7a0d0d] text-white rounded-full p-3 text-xl">🛍️</div>
                    <span className="text-xs mt-1 text-center">Seller View</span>
                    </Link>
                  </button>

                  <button
                    className="flex flex-col items-center cursor-pointer focus:outline-none"
                  >
                    <Link href="/sellerorder" className="flex flex-col items-center">
                    <div className="bg-[#1b6e0b] text-white rounded-full p-3 text-xl">📋</div>
                    <span className="text-xs mt-1 text-center">My Orders</span>
                    </Link>
                  </button>

                  <button
                    className="flex flex-col items-center cursor-pointer focus:outline-none"
                  >
                    <Link href="/sellerproduct" className="flex flex-col items-center">
                    <div className="bg-[#796008] text-white rounded-full p-3 text-xl">🏷️</div>
                    <span className="text-xs mt-1 text-center">My Products</span>
                    </Link>
                  </button>

                  <button
                    className="flex flex-col items-center cursor-pointer focus:outline-none"
                  >
                    <Link href="/dashboard" className="flex flex-col items-center">
                        <div className="bg-[#0d1f7a] text-white rounded-full p-3 text-xl w-[48px] h-[48px]">🛒</div>
                        <span className="text-xs mt-1 text-center">Customer View</span>
                    </Link>
                  </button>

                  <button
                    onClick={() => alert("Logging out...")}
                    className="flex flex-col items-center cursor-pointer focus:outline-none"
                  >
                    <div className="bg-gray-600 text-white rounded-full p-3 text-xl">↩️</div>
                    <span className="text-xs mt-1 text-center">Log Out</span>
                  </button>
                </div>
              )}


        </div> */}
      {/* </div> */}

      {/* Product Section */}
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Products</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md flex items-center"
          >
            <span className="mr-1">+</span> Add new Product
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-4 gap-4 px-6 py-4 font-semibold border-b">
            <div>Product(s)</div>
            <div>Price</div>
            <div>Stock(s)</div>
            <div>Action</div>
          </div>

          {products.map(product => (
            <div key={product.id} className="grid grid-cols-4 gap-4 px-6 py-4 border-b items-center">
              <div className="flex items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 mr-4 rounded-md object-cover"
                />
                <span className="text-sm">{product.name}</span>
              </div>
              <div>₱{product.price}</div>
              <div>{product.stock}</div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditClick(product)}
                  className="bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Price (₱)</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Stock</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className="w-full p-2 border rounded-md"
                rows="3"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                className="w-full p-2 border rounded-md"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              >
                <option value="">Select category</option>
                <option value="stationary">Stationary</option>
                <option value="bags">Bags</option>
                <option value="writing-tools">Writing Tools</option>
                <option value="desk-supplies">Desk Supplies</option>
                <option value="health-safety">Health and Safety</option>
                <option value="technology-gadgets">Technology and Gadgets</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Import Image</label>
              <input
                type="file"
                accept="image/*,video/*"
                className="w-full p-2 border rounded-md"
                onChange={(e) => setNewProduct({ ...newProduct, media: e.target.files[0] })}
              />
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="bg-red-700 text-white px-4 py-2 rounded-md"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 pt-4">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Edit Product</h1>
                <div className="space-x-2">

                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm">Product Image</label>
                  <div className="border rounded-md p-1 h-48 flex items-center justify-center">
                    <img
                      src={editingProduct.image || "/images/placeholder.png"}
                      alt="Product"
                      className="w-8 h-8 opacity-70"
                    />
                  </div>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="mt-2 w-full p-2 border rounded-md"
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: URL.createObjectURL(e.target.files[0]) })}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm">Product Title</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm">Product Price</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-md"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm">Product Stock</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-md"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm">Product Description</label>
                  <textarea
                    className="w-full p-2 border rounded-md"
                    rows="3"
                    value={editingProduct.description || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm">Product Category</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={editingProduct.category || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  >
                    <option value="">Select category</option>
                    <option value="stationary">Stationary</option>
                    <option value="bags">Bags</option>
                    <option value="writing-tools">Writing Tools</option>
                    <option value="desk-supplies">Desk Supplies</option>
                    <option value="health-safety">Health and Safety</option>
                    <option value="technology-gadgets">Technology and Gadgets</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <button
                      onClick={() => setShowEditModal(false)}
                      className="bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-md"
                    >
                      Cancel Edit
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="bg-red-700 text-white px-4 py-2 rounded-md margin-2"
                    >
                      Save Edit
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product
