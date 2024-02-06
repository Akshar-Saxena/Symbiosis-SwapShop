import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Loader from "../components/Loader";
import axios from "axios";
import BookCardDetailed from "../components/BookCardDetailed";
import toast, { Toaster } from "react-hot-toast";

export default function DetailsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [msg, setMsg] = useState("");

    const validate = () => {
        if (subject == "" || msg == "") {
            toast.error("Fill each Field");
            return;
        }
        sendEmail();
    };

    const sendEmail = () => {
        setLoading(true);
        let senderEmail;
        axios
            .post("https://campus-share-api.onrender.com/details", {
                id: document.cookie.slice(6),
            })
            .then((res) => {
                if (Object.keys(res.data).length == 2) {
                    senderEmail = res.data.email;
                }
                axios
                    .post("https://campus-share-api.onrender.com/email", {
                        email: email,
                        subject: subject,
                        msg: `Sender Email : ${senderEmail}\n\n${msg}`,
                    })
                    .then((res) => {
                        setLoading(false);
                        if (res.data.message == "Sent Successfully") {
                            toast.success("Email Sent Successfully");
                            setSubject("");
                            setMsg("");
                        } else {
                            toast.error("Error Sending Email");
                        }
                    });
            })
            .catch((e) => {
                setLoading(false);
                null;
            });
    };

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
            <Toaster />
            {loading ? (
                <Loader />
            ) : (
                <div className="flex flex-col w-full items-center justify-center">
                    <NavBar set={true} />
                    <div className="flex max-[1000px]:flex-col items-center justify-evenly w-full mt-10">
                        <BookCardDetailed
                            title={location.state.title}
                            genre={location.state.genre}
                            date={location.state.date}
                            img={location.state.img}
                            price={location.state.price}
                            user={user}
                            email={email}
                        />
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-3xl font-bold max-[1000px]:text-center max-[1000px]:my-6">
                                Connect with{" "}
                                <span className="text-[#FB635D]">{user}</span>
                            </h1>
                            <div className="bg-[#C5DCFC] max-[550px]:w-[90%] px-7 py-3 mt-4 rounded-md">
                                <input
                                    className="px-6 py-4 my-[23.5px] w-full bg-transparent border-b-2 border-black focus:outline-none focus:border-[#FB635D]"
                                    type="text"
                                    placeholder="Enter the Subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                                <textarea
                                    className="px-6 py-4 pb-5 my-[23.5px] w-full bg-transparent border-b-2 border-black focus:outline-none focus:border-[#FB635D]"
                                    type="text"
                                    placeholder="Enter the Message"
                                    value={msg}
                                    rows={6}
                                    onChange={(e) => setMsg(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={validate}
                                className="py-4 mt-4 mb-6 rounded-full px-10 text-white bg-[#FB635D]"
                            >
                                Send Message
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
