import React, { Link, useState } from "react";
import { router } from "@inertiajs/react";

import bag from "../../../../public/Assets/Dashboard/Category/bag.png"
import notebook from "../../../../public/Assets/Dashboard/Category/notebook.webp"
import pen from "../../../../public/Assets/Dashboard/Category/pen.png"
import desktop from "../../../../public/Assets/Dashboard/Category/desktop.png"
import health from "../../../../public/Assets/Dashboard/Category/health.png"
import gadget from "../../../../public/Assets/Dashboard/Category/gadget.png"

function Category({ onSendData , categories, products }){

    const [selectedProducts, setSelectedProducts] = useState(products);
    const [productTitle, setProductTitle] = useState();


    function selectCategory(searchTitle) {
        const matchedCategory = categories.find(category =>
            category.name.toLowerCase().includes(searchTitle.toLowerCase())
        );


        if (matchedCategory) {
            const filteredProducts = products.filter(
                (product) => product.category_id === matchedCategory.id
            );

            const category = matchedCategory.name

            const throwData = {
                name: category,
                products: filteredProducts
            }

            setProductTitle(matchedCategory.name);
            setSelectedProducts(filteredProducts);

            onSendData(throwData);
        } else {
            console.log('No matching category found.');
        }
    }

    return(
        <>
        <hr className="mt-20"/>
        <div className="text-center border"><p className="font-bold text-2xl">SELECT CATEGORY</p>
            {categories.map((category) => (
            <button
                key={category.id}
                onClick={() => selectCategory(category.name)} // pass whole category object
                className="block w-full border-t"
            >
                {category.name}
            </button>
            ))}
        </div>

        {/* <div>
            <h2>Child (Category)</h2>
            <button onClick={sendToParent}>Send Data to Parent</button>
        </div> */}
        <hr />

            {/* --- CATEGORY --- */}
                {/* --- HEADER TEXT --- */}
                {/* <h2 className="mt-20 text-2xl font-bold text-[#5a1c1c] border-b border-gray-300 pb-2 uppercase text-center">
                    Categories
                </h2> */}


                {/* --- CATEGORY LIST --- */}
                {/* <div className="overflow-x-auto hide-scrollbar mt-6">
                    <div className="flex flex-nowrap gap-8 px-4 justify-center">

                        <button onClick={() => {selectCategory('Stationery')}} className="flex flex-col items-center w-52 flex-shrink-0">
                            <div className="rounded-full shadow-lg p-8 bg-white">
                                <img src={notebook} alt="Stationery" className="w-30 h-30 object-cover" />
                            </div>
                            <p className="mt-2 text-xl text-[#5a1c1c] text-center">Stationery</p>
                        </button>


                        <button onClick={() => {selectCategory('Bags')}} className="flex flex-col items-center w-52 flex-shrink-0">
                            <div className="rounded-full shadow-lg p-8 bg-white">
                                <img src={bag} alt="Bags" className="w-30 h-30 object-contain" />
                            </div>
                            <p className="mt-2 text-xl text-[#5a1c1c] text-center">Bags</p>
                        </button>

                        <button onClick={() => {selectCategory('Writing Tools')}} className="flex flex-col items-center w-52 flex-shrink-0">
                            <div className="rounded-full shadow-lg p-8 bg-white">
                                <img src={pen} alt="Writing Tools" className="w-30 h-30 object-contain" />
                            </div>
                            <p className="mt-2 text-xl text-[#5a1c1c] text-center">Writing Tools</p>
                        </button>

                        <button onClick={() => {selectCategory('Desk Supplies')}} className="flex flex-col items-center w-52 flex-shrink-0">
                            <div className="rounded-full shadow-lg p-8 bg-white">
                                <img src={desktop} alt="Desk Supplies" className="w-30 h-30 object-contain" />
                            </div>
                            <p className="mt-2 text-xl text-[#5a1c1c] text-center">Desk Supplies</p>
                        </button>

                        <button onClick={() => {selectCategory('Health and Safety')}} className="flex flex-col items-center w-52 flex-shrink-0">
                            <div className="rounded-full shadow-lg p-8 bg-white">
                                <img src={health} alt="Desk Supplies" className="w-30 h-30 object-contain" />
                            </div>
                            <p className="mt-2 text-xl text-[#5a1c1c] text-center">Health and Safety</p>
                        </button>

                        <button onClick={() => {selectCategory('Technology and Gadgets')}} className="flex flex-col items-center w-52 flex-shrink-0">
                            <div className="rounded-full shadow-lg p-8 bg-white">
                                <img src={gadget} alt="Writing Tools" className="w-30 h-30 object-contain" />
                            </div>
                            <p className="mt-2 text-xl text-[#5a1c1c] text-center" >Technology and Gadgets</p>
                        </button>

                    </div>
                </div> */}

        </>
    )
}

export default Category
