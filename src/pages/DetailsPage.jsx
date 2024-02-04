import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Loader from "../components/Loader";
import { collection, getDocs } from "firebase/firestore";

export default function DetailsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");

    const getUsers = async () => {
        setLoading(true);
        const users = await getDocs(collection(db, "users"));
        users.forEach((element) => {
            if (element.data().id == location.state.token) {
                setUser(element.data().username);
                setEmail(element.data().email);
            }
        });
        setLoading(false);
    };

    useEffect(() => {
        try {
            setId(location.state.token);
            getUsers();
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
