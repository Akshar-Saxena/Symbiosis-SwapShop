import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import verifyToken from "../constants/verifyToken";
import Loader from "../components/Loader";
import toast, { Toaster } from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, store } from "../constants/firebaseConfig";
import { v4 } from "uuid";

export default function SellBookPage() {
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState(0);
    const [genre, setGenre] = useState("");
    const [img, setImg] = useState();
    const check = async () => {
        let flag = await verifyToken(document.cookie.slice(6));
        setVerified(flag);
        setLoading(false);
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        const formattedDate = `${month}-${day}-${year}`;
        const formattedTime = `${hours}:${minutes}:${seconds}`;
        return `${formattedDate} ${formattedTime}`;
    };

    const upload = async () => {
        setLoading(true);
        let link;
        let date = getCurrentDateTime();
        const image = ref(store, `${v4()}`);
        uploadBytes(image, img)
            .then((data) => {
                getDownloadURL(data.ref).then(async (val) => {
                    link = val;
                    await addDoc(collection(db, "books"), {
                        id: document.cookie.slice(6),
                        title: title,
                        author: author,
                        price: price,
                        genre: genre,
                        img: link,
                        date: date,
                    });
                    setTitle("");
                    setAuthor("");
                    setPrice(0);
                    setGenre("");
                    setImg("");
                    setLoading(false);
                    toast.success("Book uploaded successfully");
                });
            })
            .catch((e) => {
                setLoading(false);
                toast.error("Error Occured!");
            });
    };

    const validate = () => {
        if (
            title == "" ||
            author == "" ||
            genre == "" ||
            img == "" ||
            price == ""
        ) {
            toast.error("Fill each Field");
            return null;
        }
        upload();
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
                            <h1 className="text-5xl text-center my-10 font-bold">
                                Upload a{" "}
                                <span className="text-[#FB635D]">Book.</span>
                            </h1>
                            <div className="w-[60%] max-[800px]:w-[90%] m-auto h-full bg-[#C5DCFC] max-[800px]:px-12 p-4 px-[100px] rounded-t-[60px]">
                                <input
                                    className="px-6 py-4 my-[23.5px] w-full bg-transparent border-b-2 border-black focus:outline-none focus:border-[#FB635D]"
                                    type="text"
                                    placeholder="Enter the title of the book"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <input
                                    className="px-6 py-4 my-[23.5px] w-full bg-transparent border-b-2 border-black focus:outline-none focus:border-[#FB635D]"
                                    type="text"
                                    placeholder="Enter the author of the book"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                                <select
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                    className="px-6 py-4 my-[23.5px] w-full bg-transparent border-b-2 border-black focus:outline-none cursor-pointer focus:border-[#FB635D]"
                                >
                                    <option value="fiction">Fiction</option>
                                    <option value="non-fiction">
                                        Non-Fiction
                                    </option>
                                    <option value="poetry">Poetry</option>
                                    <option value="drama">Drama</option>
                                    <option value="comics">
                                        Comics / Graphic Novels
                                    </option>
                                    <option value="cookbook">Cookbook</option>
                                    <option value="travel-guide">
                                        Travel Guide
                                    </option>
                                    <option value="novel">Novel</option>
                                    <option value="education">Education</option>
                                </select>
                                <input
                                    className="px-6 py-4 my-[23.5px] w-full bg-transparent border-b-2 border-black focus:outline-none focus:border-[#FB635D]"
                                    type="number"
                                    placeholder="Enter the Selling Price of the book"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <input
                                    className="px-6 py-4 my-[23.5px] w-full bg-transparent border-b-2 border-black focus:outline-none focus:border-[#FB635D]"
                                    type="file"
                                    accept="image/*"
                                    placeholder="Enter the Selling Price of the book"
                                    onChange={(e) => setImg(e.target.files[0])}
                                />
                                <button
                                    onClick={validate}
                                    className="py-4 ml-[50%] my-6 -translate-x-1/2  rounded-full px-10 text-white bg-[#FB635D]"
                                >
                                    Upload Book
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
