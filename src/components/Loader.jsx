import React from "react";
import { RotateLoader } from "react-spinners";

export default function Loader() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center">
                <img className="w-[100px] mb-[50px]" src="/book.png" alt="" />
                <RotateLoader color="#FB635D" size={20} />
            </div>
        </div>
    );
}
