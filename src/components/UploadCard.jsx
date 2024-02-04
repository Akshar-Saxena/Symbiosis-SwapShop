import React from "react";

export default function UploadCard(props) {
    return (
        <div className="flex mb-4 justify-between items-center w-[94%] shadow-md shadow-gray-500 rounded-md m-auto p-3">
            <div className="flex flex-col">
                <h1 className="font-semibold text-[#FB635D]">
                    Title : <span className="text-black">{props.title}</span>
                </h1>
                <h1 className="font-semibold text-[#FB635D]">
                    Price :{" "}
                    <span className="text-black">
                        {props.price == 0 ? "Free" : `Rs. ${props.price}`}
                    </span>
                </h1>
            </div>
            <img className="w-[20px] h-[25px]" src="./delete.png" alt="" />
        </div>
    );
}
