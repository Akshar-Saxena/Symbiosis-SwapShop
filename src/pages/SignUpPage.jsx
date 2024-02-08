import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import forge from "node-forge";

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [correctOtp, setCorrectOtp] = useState(
        Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000
    );
    const [otp, setOtp] = useState(-1);
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();

    const verifyOtp = () => {
        if (otp == correctOtp) {
            signHandler();
        } else {
            toast.error("Invalid OTP");
        }
    };

    const OtpVerification = () => {
        setLoading(true);
        axios
            .post("https://campus-share-api.onrender.com/otp", {
                email: email,
                username: username,
            })
            .then((response) => {
                setLoading(false);
                if (Object.keys(response.data).length == 2) {
                    setCorrectOtp(response.data.otp);
                    toast.success(
                        "OTP Sent Successfully! Please check Spam box in Gmail"
                    );
                } else {
                    toast.error("Error Sending OTP, Refresh and Retry Again!");
                }
                setToggle(true);
            })
            .catch((error) => {
                setLoading(false);
                null;
            });
    };

    const signHandler = async () => {
        setLoading(true);
        const md = forge.md.sha512.create();
        md.update(pass, "utf8");
        const hashHex = md.digest().toHex();
        axios
            .post("https://campus-share-api.onrender.com/signup", {
                username: username.trim(),
                email: email.trim(),
                password: hashHex,
            })
            .then((res) => {
                document.cookie =
                    "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
                document.cookie = `token=${res.data.token}`;
                setLoading(false);
                navigate("/");
            })
            .catch((err) => {
                setLoading(false);
                toast.error("User with this email already exists");
            });
    };

    const validate = () => {
        if (pass == "" || username == "" || email == "") {
            toast.error("Fill each fields");
            return null;
        }
        if (!email.includes("@akgec.ac.in")) {
            toast.error("Please enter college email");
            return null;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Please enter college email");
            return null;
        }

        OtpVerification();
    };

    return (
        <div>
            <Toaster />
            {loading ? (
                <Loader />
            ) : (
                <div className="flex h-screen w-full justify-between">
                    <div className="flex flex-col w-[40%] max-[750px]:hidden px-8 justify-evenly items-center">
                        <h1 className="text-5xl text-center font-bold">
                            <span className="text-[#FB635D]">Swap</span> it,{" "}
                            <br /> Rock it, <br /> Own it
                            <br />
                            <br />
                            <span className="text-black">
                                Symbiosis{" "}
                                <span className="text-[#FB635D]">Swap</span>Shop
                            </span>
                        </h1>
                        <img
                            className="w-[250px]"
                            src="/symbiosis.png"
                            alt=""
                        />
                    </div>
                    <div className="bg-[#C5DCFC] max-[750px]:w-full max-[750px]:rounded-none flex flex-col justify-center items-center w-[60%] shadow-lg shadow-[#FB635D] rounded-l-[80px]">
                        <h1
                            className="text-5xl font-bold mb-8"
                            style={{
                                display: `${!toggle ? "block" : "none"}`,
                            }}
                        >
                            Sign Up
                        </h1>
                        <h1
                            className="text-5xl font-bold mb-8"
                            style={{
                                display: `${toggle ? "block" : "none"}`,
                            }}
                        >
                            Verify OTP
                        </h1>
                        <div className="w-[60%] max-[400px]:w-[75%]">
                            <input
                                className="px-6 py-4 my-8 w-full bg-transparent border-b-2 border-black focus:outline-none focus:border-[#FB635D]"
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    display: `${!toggle ? "block" : "none"}`,
                                }}
                            />
                            <input
                                className="px-6 py-4 my-8 w-full bg-transparent border-b-2 border-black focus:outline-none focus:border-[#FB635D]"
                                type="text"
                                placeholder="Create Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={{
                                    display: `${!toggle ? "block" : "none"}`,
                                }}
                            />
                            <input
                                className="px-6 py-4 my-8 w-full bg-transparent border-b-2 border-black focus:outline-none focus:border-[#FB635D]"
                                type="password"
                                placeholder="Create Password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                style={{
                                    display: `${!toggle ? "block" : "none"}`,
                                }}
                            />
                            <input
                                className="px-6 py-4 my-8 w-full bg-transparent border-b-2 border-black focus:outline-none focus:border-[#FB635D]"
                                type="number"
                                placeholder="Enter the OTP"
                                value={otp == -1 ? "" : otp}
                                onChange={(e) => setOtp(e.target.value)}
                                style={{
                                    display: `${toggle ? "block" : "none"}`,
                                }}
                            />
                        </div>
                        <button
                            onClick={validate}
                            className="py-4 mt-14 rounded-full px-10 text-white bg-[#FB635D]"
                            style={{
                                display: `${!toggle ? "block" : "none"}`,
                            }}
                        >
                            Get Otp
                        </button>
                        <button
                            onClick={verifyOtp}
                            className="py-4 mt-14 rounded-full px-10 text-white bg-[#FB635D]"
                            style={{
                                display: `${toggle ? "block" : "none"}`,
                            }}
                        >
                            Sign Up
                        </button>
                        <h1 className="font-semibold mt-9">
                            Already have an Account?{" "}
                            <a className="text-[#FB635D]" href="/login">
                                Login
                            </a>
                        </h1>
                    </div>
                </div>
            )}
        </div>
    );
}
