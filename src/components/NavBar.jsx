import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar(props) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const toggleOpen = () => {
        setOpen(!open);
    };
    return (
        <div className="flex py-5 justify-between items-center w-[90%] m-auto">
            <img className="w-[200px]" src="/logo.png" alt="" />
            <button
                onClick={toggleOpen}
                className="text-4xl min-[750px]:hidden"
            >
                &#9776;
            </button>
            {open && (
                <ul
                    onClick={toggleOpen}
                    className="flex absolute min-[750px]:hidden top-[90px] left-0 p-5 bg-[#FB635D] bg-opacity-90 flex-col justify-center items-center w-[100%]"
                >
                    <Link to="/">
                        <li className="hover:text-white py-5 text-lg cursor-pointer font-semibold ">
                            Home
                        </li>
                    </Link>
                    <a href="/#about">
                        <li className="hover:text-white py-5 text-lg cursor-pointer font-semibold ">
                            About
                        </li>
                    </a>
                    <Link to="/upload">
                        <li className="hover:text-white py-5 text-lg cursor-pointer font-semibold ">
                            Upload
                        </li>
                    </Link>
                    <Link to="/items">
                        <li className="hover:text-white py-5 text-lg cursor-pointer font-semibold ">
                            All Items
                        </li>
                    </Link>

                    {!props.set ? (
                        <Link to="/login">
                            <li className="hover:text-white py-5 text-lg cursor-pointer font-semibold ">
                                Get Started
                            </li>
                        </Link>
                    ) : (
                        <Link
                            onClick={() => {
                                document.cookie =
                                    "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
                                navigate("/");
                                window.location.reload();
                            }}
                        >
                            <li className="hover:text-white py-5 text-lg cursor-pointer font-semibold ">
                                Logout
                            </li>
                        </Link>
                    )}
                </ul>
            )}
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
                    onClick={() => navigate("/profile")}
                    className="w-[30px] max-[750px]:hidden cursor-pointer"
                    src="/profile.png"
                    alt=""
                />
            )}
        </div>
    );
}
