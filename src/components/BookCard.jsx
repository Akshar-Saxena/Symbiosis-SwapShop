import React from "react";
import { useNavigate } from "react-router-dom";

export default function BookCard(props) {
    const navigate = useNavigate();
    return (
        <div className="flex flex-wrap justify-center w-fit p-5 m-3 items-center rounded-lg shadow-lg shadow-[#FB635D] bg-[#EBF3FF]">
            <img className="w-[150px]" src={props.img} alt="" />
            <div className="pl-6">
                <h1 className="font-semibold">
                    Title: <span className="text-[#FB635D]">{props.title}</span>
                </h1>
                <h1 className="font-semibold">
                    Category:{" "}
                    <span className="text-[#FB635D]">{props.genre}</span>
                </h1>
                <h1 className="font-semibold">
                    Price:{" "}
                    {props.price == 0 ? (
                        <span className="text-[#FB635D]">Free</span>
                    ) : (
                        <span className="text-[#FB635D]">Rs.{props.price}</span>
                    )}
                </h1>
                <h1 className="font-bold text-xs">
                    Uploaded on:{" "}
                    <span className="text-[#FB635D]">{props.date}</span>
                </h1>
                <button
                    onClick={() =>
                        navigate("/details", { state: { token: props.token } })
                    }
                    className="py-2 rounded-full px-6 mt-5 text-white bg-[#FB635D]"
                >
                    View Details
                </button>
            </div>
        </div>
    );
}
