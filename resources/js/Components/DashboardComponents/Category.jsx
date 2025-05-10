import React from "react";

// Category List Image
import bag from "../../../../public/Assets/Dashboard/Category/bag.png"
import notebook from "../../../../public/Assets/Dashboard/Category/notebook.webp"
import pen from "../../../../public/Assets/Dashboard/Category/pen.png"
import desktop from "../../../../public/Assets/Dashboard/Category/desktop.png"
import health from "../../../../public/Assets/Dashboard/Category/health.png"
import gadget from "../../../../public/Assets/Dashboard/Category/gadget.png"

export default function Category(){
    return(
        <>
            {/* --- CATEGORY --- */}
                {/* --- HEADER TEXT --- */}
                <h2 className="mt-20 text-2xl font-bold text-[#5a1c1c] border-b border-gray-300 pb-2 uppercase text-center">
                    Categories
                </h2>

                {/* --- CATEGORY LIST --- */}
                <div className="overflow-x-auto hide-scrollbar mt-6">

                    <div className="flex flex-nowrap gap-8 px-4 justify-center">

                        {/* --- STATIONERY --- */}
                        <div className="flex flex-col items-center w-52 flex-shrink-0">
                            <div className="rounded-full shadow-lg p-8 bg-white">
                                <img src={notebook} alt="Stationery" className="w-30 h-30 object-cover" />
                            </div>
                            <p className="mt-2 text-xl text-[#5a1c1c] text-center">Stationery</p>
                        </div>

                        {/* --- BAGS --- */}
                        <div className="flex flex-col items-center w-52 flex-shrink-0">
                            <div className="rounded-full shadow-lg p-8 bg-white">
                                <img src={bag} alt="Bags" className="w-30 h-30 object-contain" />
                            </div>
                            <p className="mt-2 text-xl text-[#5a1c1c] text-center">Bags</p>
                        </div>

                        {/* WRITING TOOLS */}
                        <div className="flex flex-col items-center w-52 flex-shrink-0">
                            <div className="rounded-full shadow-lg p-8 bg-white">
                                <img src={pen} alt="Writing Tools" className="w-30 h-30 object-contain" />
                            </div>
                            <p className="mt-2 text-xl text-[#5a1c1c] text-center">Writing Tools</p>
                        </div>

                        {/* --- DESK SUPPLIES --- */}
                        <div className="flex flex-col items-center w-52 flex-shrink-0">
                            <div className="rounded-full shadow-lg p-8 bg-white">
                                <img src={desktop} alt="Desk Supplies" className="w-30 h-30 object-contain" />
                            </div>
                            <p className="mt-2 text-xl text-[#5a1c1c] text-center">Desk Supplies</p>
                        </div>

                        {/* --- HEALTH & SAFETY --- */}
                        <div className="flex flex-col items-center w-52 flex-shrink-0">
                            <div className="rounded-full shadow-lg p-8 bg-white">
                                <img src={health} alt="Desk Supplies" className="w-30 h-30 object-contain" />
                            </div>
                            <p className="mt-2 text-xl text-[#5a1c1c] text-center">Health and Safety</p>
                        </div>

                        {/* --- TECHNOLOGY & GADGETS --- */}
                        <div className="flex flex-col items-center w-52 flex-shrink-0">
                            <div className="rounded-full shadow-lg p-8 bg-white">
                                <img src={gadget} alt="Writing Tools" className="w-30 h-30 object-contain" />
                            </div>
                            <p className="mt-2 text-xl text-[#5a1c1c] text-center" >Technology and Gadgets</p>
                        </div>

                    </div>
                </div>

        </>
    )
}
