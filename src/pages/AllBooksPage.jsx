import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Toaster } from "react-hot-toast";
import NavBar from "../components/NavBar";
import BookCard from "../components/BookCard";
import Footer from "../components/Footer";
import axios from "axios";

export default function AllBooksPage() {
    const [loading, setLoading] = useState(true);
    const [verified, setVerified] = useState();
    const [data, setData] = useState();

    const getBooks = async () => {
        setLoading(true);
        axios
            .get("https://campus-share-api.onrender.com/allItems")
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((e) => {
                setLoading(false);
            });
    };

    const check = async () => {
        axios
            .post("https://campus-share-api.onrender.com/details", {
                id: document.cookie.slice(6),
            })
            .then((response) => {
                setVerified(true);
                setLoading(false);
                getBooks();
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        check();
    }, []);
    return (
        <div>
            <Toaster />
            {loading ? (
                <Loader />
            ) : (
                <div>
                    {!verified ? (
                        <div className="h-screen flex justify-center items-center w-full text-6xl font-bold">
                            Please{" "}
                            <a className="text-[#FB635D] ml-3" href="/login">
                                Login
                            </a>
                        </div>
                    ) : (
                        <div>
                            <NavBar set={verified} />
                            <div className="w-[80%] flex justify-between items-center m-auto mt-10">
                                <h1 className="text-5xl font-bold">
                                    All{" "}
                                    <span className="text-[#FB635D]">
                                        Books.
                                    </span>
                                </h1>
                                {/* <div className="bg-[#FB635D] flex justify-center items-center rounded-full w-[33%] h-[55px] relative">
                                    <div className="absolute flex justify-center w-full px-8 items-center h-full top-0">
                                        <input
                                            className="bg-transparent focus:outline-none text-white w-full border-b-2 py-2 border-white"
                                            type="text"
                                        />
                                        <img
                                            className="w-[30px]"
                                            src="/search.png"
                                            alt=""
                                        />
                                    </div>
                                </div> */}
                            </div>
                            <div className="w-[90%] flex flex-wrap m-auto justify-evenly items-center my-10">
                                {data != undefined &&
                                    data.map((element, i) => (
                                        <BookCard
                                            key={i}
                                            title={element.title}
                                            author={element.author}
                                            price={element.price}
                                            img={element.img}
                                            date={element.date}
                                            genre={element.genre}
                                            token={element.id}
                                        />
                                    ))}
                            </div>
                            <Footer />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}