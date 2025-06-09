/**
 * client/src/routes/ProtectedRoute.jsx
 * Komponen untuk membatasi akses route berdasarkan autentikasi user
 * Menggunakan AuthContext untuk memeriksa token autentikasi
 * Jika token tidak ada, redirect ke halaman login
 */

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
    // Mengambil token dari context autentikasi
    const { token } = useContext(AuthContext);

    // Jika token tidak ada, redirect ke halaman login
    if (!token) {
        console.log("No token found, redirecting to login");
        return <Navigate to="/" replace />;
    }

    // Jika token ada, render children (komponen yang dilindungi)
    return children;
}
