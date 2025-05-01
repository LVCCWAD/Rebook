import React from "react";
import Img1 from "../../../Assets/img1.jpg"
import Img2 from "../../../Assets/img2.jpg"
import Img3 from "../../../Assets/img3.jpg"
import Img4 from "../../../Assets/img4.jpg"

export default function Slider1(){
    return(
        <>
        <div className="w-full h-auto flex flex-row">
            {/* --- Left Img Container --- */}
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

                {/* --- Right box Container --- */}
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
