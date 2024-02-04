import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import axios from "axios";
export default function HomePage() {
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(true);
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
                    <div className="w-[90%] max-[820px]:flex-col-reverse flex justify-between items-center m-auto">
                        <div className="w-[50%] max-[820px]:w-[70%] mt-10">
                            <h1 className="text-6xl max-[500px]:text-4xl font-semibold">
                                Sharing Accessorizing <br />{" "}
                                <span className="text-[#FB635D]">
                                    Opportunities
                                </span>{" "}
                                <br /> Across
                                <span className="text-[#FB635D]"> Campus!</span>
                            </h1>
                            <p className="text-gray-600 font-semibold my-5">
                                Elevate your style, share your flair – Symbiosis
                                Swapshop, where campus fashion thrives through
                                collaboration.
                            </p>
                        </div>
                        <img
                            className="w-[40%] max-[820px]:w-[60%] max-[500px]:w-[90%] max-[500px]:mt-16"
                            src="/hero.png"
                            alt=""
                        />
                    </div>
                    <div
                        id="about"
                        className="flex justify-center items-center flex-col pb-10 bg-[#EBF3FF] p-4 mt-10"
                    >
                        <h1 className="text-5xl font-semibold text-[#FB635D] mb-6">
                            About
                        </h1>
                        <p className="w-[70%] text-justify text-lg">
                            Welcome to Symbiosis Swapshop, the innovative
                            platform connecting campus users with surplus
                            accessories to those in need. Whether you're looking
                            to declutter your collection or seeking that perfect
                            finishing touch for your outfit, our
                            community-driven exchange hub fosters collaboration
                            and empowerment. Join us in reshaping campus
                            fashion, one accessory at a time!
                        </p>
                        <p className="w-[70%] text-justify text-lg">
                            At Symbiosis Swapshop, we're dedicated to fostering
                            a vibrant campus community by facilitating the
                            exchange of accessories, empowering users to express
                            their unique style while reducing waste and
                            promoting sustainability.
                        </p>
                        <div className="w-[70%] flex flex-col">
                            <h1 className="text-xl font-bold mt-6">
                                Our Mission
                            </h1>
                            <p className=" text-justify text-lg">
                                Founded on the principles of collaboration and
                                inclusivity, Symbiosis Swapshop provides a space
                                for users to exchange surplus accessories,
                                reducing waste and giving new life to items that
                                might otherwise go unused. Whether you're
                                looking to declutter your collection, find the
                                perfect finishing touch for your outfit, or
                                simply connect with fellow fashion enthusiasts,
                                our platform is here to empower you.
                            </p>
                        </div>
                        <div className="w-[70%] flex flex-col">
                            <h1 className="text-xl font-bold mt-6">
                                Building Community
                            </h1>
                            <p className=" text-justify text-lg">
                                Joining the Symbiosis Swapshop community is your
                                gateway to a world of shared style and
                                sustainable fashion. Whether you're a
                                trendsetter with surplus accessories or seeking
                                that perfect piece to complete your look, our
                                platform welcomes you with open arms. By joining
                                us, you're not just participating in an exchange
                                – you're becoming part of a vibrant campus
                                network where connections are made, stories are
                                shared, and fashion becomes a force for good.
                                Together, let's redefine campus style and create
                                a community where everyone's wardrobe is a
                                source of inspiration. Sign up now and start
                                swapping!
                            </p>
                        </div>
                        <div className="w-[70%] flex flex-col">
                            <h1 className="text-xl font-bold mt-6">
                                Gratitude
                            </h1>
                            <p className=" text-justify text-lg">
                                We believe in the power of connection and
                                collaboration. Your presence adds to the vibrant
                                tapestry of our community, and we're thrilled to
                                have you on board.
                            </p>
                        </div>
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    );
}
