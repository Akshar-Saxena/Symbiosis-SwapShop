import React from "react";
import { RotateLoader } from "react-spinners";

export default function Loader() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center">
                <img
                    className="w-[100px] mb-[20px]"
                    src="/symbiosis.png"
                    alt=""
                />
                <h1 className="mb-10 font-bold">Symbiosis SwapShop</h1>
                <RotateLoader color="#FB635D" size={20} />
            </div>
        </div>
    );
}
