import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Loader from "../components/Loader";
import toast, { Toaster } from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { store } from "../constants/firebaseConfig";
import { v4 } from "uuid";
import axios from "axios";

export default function SellBookPage() {
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(-1000);
    const [genre, setGenre] = useState("");
    const [img, setImg] = useState("");
    const check = () => {
        axios
            .post("https://campus-share-api.onrender.com/details", {
                id: document.cookie.slice(6),
            })
            .then((response) => {
                setVerified(true);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    const upload = async () => {
        setLoading(true);
        let link;
        const image = ref(store, `${v4()}`);
        uploadBytes(image, img)
            .then((data) => {
                getDownloadURL(data.ref).then(async (val) => {
                    link = val;
                    axios
                        .post("https://campus-share-api.onrender.com/upload", {
                            id: document.cookie.slice(6),
                            title: title,
                            price: price,
                            category: genre,
                            img: link,
                        })
                        .then((res) => {
                            setLoading(false);
                            setTitle("");
                            setPrice(-1000);
                            setGenre("");
                            setImg("");
                            toast.success("Item uploaded successfully");
                        })
                        .catch((e) => {
                            setLoading(false);
                            toast.error("Error uploading Item");
                        });
                });
            })
            .catch((e) => {
                setLoading(false);
                toast.error("Error Occured!");
            });
    };

    const validate = () => {
        if (title == "" || genre == "" || img == "") {
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
                                Upload an{" "}
                                <span className="text-[#FB635D]">Item.</span>
                            </h1>
                            <div className="w-[60%] max-[800px]:w-[90%] m-auto h-full bg-[#C5DCFC] max-[800px]:px-12 p-4 px-[100px] rounded-t-[60px]">
                                <input
                                    className="px-6 py-4 my-[23.5px] w-full bg-transparent border-b-2 border-black focus:outline-none focus:border-[#FB635D]"
                                    type="text"
                                    placeholder="Enter the title of the Item"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <select
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                    className="px-6 py-4 my-[23.5px] w-full bg-transparent border-b-2 border-black focus:outline-none cursor-pointer focus:border-[#FB635D]"
                                >
                                    <option value="">
                                        Select the Category
                                    </option>
                                    <option value="Stationary">
                                        Stationary
                                    </option>
                                    <option value="Apparels">Apparels</option>
                                    <option value="Shoes">Shoes</option>
                                    <option value="Courses">Courses</option>
                                    <option value="Books">Books</option>
                                </select>
                                <input
                                    className="px-6 py-4 my-[23.5px] w-full bg-transparent border-b-2 border-black focus:outline-none focus:border-[#FB635D]"
                                    type="number"
                                    placeholder="Enter the Selling Price of the Item (0 for Free)"
                                    value={price == -1000 ? "" : price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <input
                                    className="px-6 py-4 my-[23.5px] w-full bg-transparent border-b-2 border-black focus:outline-none focus:border-[#FB635D]"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImg(e.target.files[0])}
                                />
                                <button
                                    onClick={validate}
                                    className="py-4 ml-[50%] my-6 -translate-x-1/2  rounded-full px-10 text-white bg-[#FB635D]"
                                >
                                    Upload Item
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
