/**
 * client/src/App.jsx
 * Komponen utama aplikasi React
 * Mengatur autentikasi user berdasarkan token JWT di localStorage
 * Menyediakan routing aplikasi melalui AppRoutes
 * Menyimpan data transaksi default di localStorage jika belum ada
 */

import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

import AppRoutes from './routes/AppRoutes';
import { Toaster } from "react-hot-toast";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import * as jwt_decode from "jwt-decode";

// Menyimpan data transaksi default di localStorage jika belum ada
if (!localStorage.getItem("transactionsData")) {
  localStorage.setItem(
    "transactionsData",
    JSON.stringify([
      {
        id: 1,
        produk: "Barang A",
        jumlah: 10,
        tipe: "masuk",
        tanggal: "2024-05-20",
        status: "approved",
        user_input: "sar",
      },
      {
        id: 2,
        produk: "Barang B",
        jumlah: 5,
        tipe: "keluar",
        tanggal: "2024-05-21",
        status: "pending",
        user_input: "daffa",
      },
      {
        id: 3,
        produk: "Barang C",
        jumlah: 7,
        tipe: "masuk",
        tanggal: "2024-05-21",
        status: "approved",
        user_input: "sar",
      },
      {
        id: 4,
        produk: "Barang B",
        jumlah: 3,
        tipe: "keluar",
        tanggal: "2024-05-22",
        status: "approved",
        user_input: "daffa",
      }
    ])
  );
}

function App() {
  // State untuk menyimpan status autentikasi user
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mengecek token JWT di localStorage saat komponen mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode.default(token);
        const currentTime = Date.now() / 1000;
        // Jika token belum expired, set isAuthenticated true
        if (decoded.exp > currentTime) {
          setIsAuthenticated(true);
        } else {
          // Jika token expired, hapus localStorage dan set false
          localStorage.clear();
          setIsAuthenticated(false);
        }
      } catch (error) {
        // Jika error decode token, hapus localStorage dan set false
        localStorage.clear();
        setIsAuthenticated(false);
      }
    }
  }, []);

  // Render routing aplikasi dengan prop isAuthenticated
  return <AppRoutes isAuthenticated={isAuthenticated} />;
}

export default App;
