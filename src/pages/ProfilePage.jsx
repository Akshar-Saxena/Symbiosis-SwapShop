import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import UploadCard from "../components/UploadCard";

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [verified, setVerified] = useState(false);
    const [email, setEmail] = useState("");
    const [myItems, setMyItems] = useState([]);
    const [user, setUser] = useState("");
    const navigate = useNavigate();

    const getMyItems = () => {
        axios
            .post("https://campus-share-api.onrender.com/myitems", {
                query: document.cookie.slice(6),
            })
            .then((response) => {
                try {
                    if (response.data.message) {
                        null;
                    }
                    setMyItems(response.data);
                } catch (e) {
                    null;
                }
            });
    };

    const check = () => {
        axios
            .post("https://campus-share-api.onrender.com/details", {
                id: document.cookie.slice(6),
            })
            .then((response) => {
                if (Object.keys(response.data).length == 2) {
                    setVerified(true);
                    setEmail(response.data.email);
                    setUser(response.data.username);
                    getMyItems();
                } else {
                    setVerified(false);
                    navigate("/");
                }
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                navigate("/");
            });
    };
    useEffect(() => {
        check();
    }, []);
    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <NavBar set={verified} />
                    <div className="flex max-[920px]:flex-col max-[920px]:items-center justify-evenly mt-8">
                        <div className="flex flex-col max-[800px]:w-[350px] max-[380px]:w-[270px] w-[35%] h-[400px] p-5 m-3 items-center rounded-lg shadow-lg shadow-[#FB635D] bg-[#EBF3FF] ">
                            <div className="w-[200px] h-[200px] mb-10 rounded-full bg-gray-200"></div>
                            <h1 className="text-2xl font-bold my-3">
                                My Profile
                            </h1>
                            <h1 className="text-[#FB635D] font-semibold">
                                Username :{" "}
                                <span className="text-black">{user}</span>
                            </h1>
                            <h1 className="text-[#FB635D] max-[380px]:text-xs font-semibold">
                                Email:{" "}
                                <span className="text-black">{email}</span>
                            </h1>
                        </div>
                        <div className="flex flex-col max-[800px]:w-[350px] max-[380px]:w-[270px] w-[35%] h-[400px] p-5 m-3 rounded-lg shadow-lg shadow-[#FB635D] bg-[#EBF3FF]">
                            <h1 className="text-black font-bold">
                                Items{" "}
                                <span className="text-[#FB635D]">Uploaded</span>
                            </h1>
                            <div className="mt-5 overflow-y-scroll">
                                {myItems.map((element, id) => (
                                    <UploadCard
                                        key={id}
                                        title={element.title}
                                        price={element.price}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <button
                        className="py-4 ml-[50%] -translate-x-1/2 mt-10 max-[920px]:mb-6 rounded-full px-10 text-white bg-[#FB635D]"
                        onClick={() => {
                            document.cookie =
                                "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
                            window.location.reload();
                        }}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
