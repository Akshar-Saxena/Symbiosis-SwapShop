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
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");

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

    const searchHandler = () => {
        setLoading(true);
        axios
            .post("https://campus-share-api.onrender.com/search", {
                query: query,
            })
            .then((res) => {
                setData([]);
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
                if (Object.keys(response.data).length == 2) {
                    setVerified(true);
                    getBooks();
                } else {
                    setVerified(false);
                }
                setLoading(false);
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
                        <div className="h-screen flex justify-center max-[500px]:text-4xl items-center w-full text-6xl font-bold">
                            Please{" "}
                            <a className="text-[#FB635D] ml-3" href="/login">
                                Login
                            </a>
                        </div>
                    ) : (
                        <div>
                            <NavBar set={verified} />
                            <div className="w-[80%] flex max-[700px]:flex-col justify-between items-center m-auto mt-10">
                                <h1 className="text-5xl font-bold">
                                    All{" "}
                                    <span className="text-[#FB635D]">
                                        Items.
                                    </span>
                                </h1>
                                <div className="bg-[#FB635D] max-[700px]:mt-6  items-center justify-between px-6 flex rounded-3xl">
                                    <input
                                        className="bg-transparent max-[380px]:w-[150px] text-white focus:border-black my-3 focus:outline-none border-b-2 border-white"
                                        type="text"
                                        value={query}
                                        onChange={(e) =>
                                            setQuery(e.target.value)
                                        }
                                    />
                                    <img
                                        className="w-[30px] ml-4 cursor-pointer h-[30px]"
                                        src="./search.png"
                                        alt=""
                                        onClick={searchHandler}
                                    />
                                </div>
                            </div>
                            <div className="w-[90%] flex flex-wrap m-auto justify-evenly items-center my-10">
                                {data != [] &&
                                    data.map((element, i) => (
                                        <BookCard
                                            key={i}
                                            title={element.title}
                                            price={element.price}
                                            img={element.img}
                                            date={element.date}
                                            genre={element.category}
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
