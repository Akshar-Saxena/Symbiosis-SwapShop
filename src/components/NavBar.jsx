import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar(props) {
    const navigate = useNavigate();
    return (
        <div className="flex py-5 justify-between items-center w-[90%] m-auto">
            <img className="w-[200px]" src="/logo.png" alt="" />
            <button className="text-4xl min-[750px]:hidden">&#9776;</button>
            <ul className="flex justify-between w-[30%] max-[750px]:hidden">
                <Link to="/">
                    <li className="hover:text-[#FB635D] cursor-pointer font-semibold ">
                        Home
                    </li>
                </Link>
                <a href="/#about">
                    <li className="hover:text-[#FB635D] cursor-pointer font-semibold ">
                        About
                    </li>
                </a>
                <Link to="/upload">
                    <li className="hover:text-[#FB635D] cursor-pointer font-semibold ">
                        Upload
                    </li>
                </Link>
                <Link to="/items">
                    <li className="hover:text-[#FB635D] cursor-pointer font-semibold ">
                        All Items
                    </li>
                </Link>
                {/* <Link>
                    <li className="hover:text-[#FB635D] cursor-pointer font-semibold ">
                        Choose me a Book
                    </li>
                </Link> */}
            </ul>
            {!props.set ? (
                <button
                    onClick={() => navigate("/login")}
                    className="py-4 max-[750px]:hidden rounded-full px-10 text-white bg-[#FB635D]"
                >
                    Login
                </button>
            ) : (
                <img
                    onClick={() => {
                        document.cookie =
                            "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
                        window.location.reload();
                    }}
                    className="w-[30px] max-[750px]:hidden cursor-pointer"
                    src="/profile.png"
                    alt=""
                />
            )}
        </div>
    );
}
