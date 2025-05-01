import React from "react";

export default function(){
    return(
        <>
            {/* --- BANNER --- */}
            <div className="relative flex items-center justify-between bg-red-800 text-white px-[3%] py-2">
                {/* --- TEXT --- */}
                <div className="flex flex-row justify-between w-full">
                    <h1 className="text-5xl font-bold">Bag It All Sale!</h1>
                    <button className="bg-white text-black py-2 px-[4%] rounded-full m-1">SHOP NOW</button>
                </div>
            </div>
        </>
    )
}
