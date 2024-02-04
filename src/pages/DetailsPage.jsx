import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Loader from "../components/Loader";
import { collection, getDocs } from "firebase/firestore";
import axios from "axios";

export default function DetailsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");

    const getUsers = (id) => {
        setLoading(true);
        axios
            .post("https://campus-share-api.onrender.com/details", {
                id: id,
            })
            .then((res) => {
                if (Object.keys(res.data).length == 2) {
                    setUser(res.data.username);
                    setEmail(res.data.email);
                }
                setLoading(false);
            })
            .catch((e) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        try {
            getUsers(location.state.token);
        } catch (err) {
            navigate("/");
        }
    }, []);
    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div className="flex flex-col w-full items-center justify-center">
                    <NavBar set={true} />
                    <div className="bg-[#EBF3FF] p-8 rounded-xl shadow-md shadow-[#FB635D] w-fit min-w-[200px] mx-5 mt-20">
                        <h1 className="font-bold text-5xl">Details</h1>
                        <h1 className="text-lg font-semibold">
                            Uploaded by -{" "}
                            <span className="text-[#FB635D]">{user}</span>
                        </h1>
                        <h1 className="text-lg font-semibold">
                            Email -{" "}
                            <span className="text-[#FB635D]">{email}</span>
                        </h1>
                    </div>
                </div>
            )}
        </div>
    );
}
