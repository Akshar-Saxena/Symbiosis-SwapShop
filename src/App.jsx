import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SellBookPage from "./pages/SellBookPage";
import AllBooksPage from "./pages/AllBooksPage";
import DetailsPage from "./pages/DetailsPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/signup" element={<SignUpPage />} />
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/upload" element={<SellBookPage />} />
                <Route exact path="/items" element={<AllBooksPage />} />
                <Route exact path="/details" element={<DetailsPage />} />
                <Route exact path="/profile" element={<ProfilePage />} />
            </Routes>
        </Router>
    );
}
