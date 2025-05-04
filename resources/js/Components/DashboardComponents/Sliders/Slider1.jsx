import React from "react";

export default function Slider1( data ){
    console.log("Props data passed: ", data.data[0])
    const Img1 = data.data[0]
    const Img2 = data.data[1]
    const Img3 = data.data[2]
    const Img4 = data.data[3]
    return(
        <>
        {/* --- SLIDER 1 --- */}
        <div className="w-full h-auto flex flex-row">
            {/* --- LEFT CONTAINER --- */}
            <div className="h-auto flex flex-auto flex-row justify-evenly items-center w-[60%]">

                {/* --- IMG 1 --- */}
                <div className="border w-[80%] h-[80%] overflow-hidden m-4">
                    <img
                        src={Img1}
                        alt="technology"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* --- IMG 2 --- */}
                <div className="border w-[80%] h-[80%] overflow-hidden m-4">
                    <img
                        src={Img2}
                        alt="technology"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* --- RIGHT CONTAINER --- */}
            <div className="h-auto relative flex flex-row justify-center items-center w-[40%]">
                <div className="flex flex-col w-full h-auto">

                    {/* --- TOP --- */}
                    <div className="flex flow-row justify-between h-auto mt-12">
                        {/* --- IMG 3 --- */}
                            <img
                                src={Img3}
                                alt="technology"
                                className="border w-[48%]"
                            />
                        {/* --- IMG 4 --- */}
                            <img
                                src={Img4}
                                alt="technology"
                                className="border w-[48%]"
                            />
                    </div>

                    {/* --- BOT --- */}
                    <div className="flex flex-col justify-between items-center gap-1 h-auto">

                        {/* --- TEXT 1 --- */}
                        <div className="bg-red-800 w-full text-white font-bold">
                            <p className="text-5xl tracking-wider text-right pt-3 pb-2">Backpacks & Mini Bags</p>
                        </div>

                        {/* --- TEXT 2 --- */}
                        <div className="flex justify-end w-full text-right">
                            <div className="flex flexcol text-4xl font-bold gap-x-5 ">Get up to
                                <p className="text-7xl font-extrabold tracking-wider">10% OFF</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
