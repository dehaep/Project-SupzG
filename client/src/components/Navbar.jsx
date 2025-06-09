/**
 * client/src/components/Navbar.jsx
 * Komponen Navbar yang menampilkan judul halaman, breadcrumb, dan tombol toggle sidebar
 * Menggunakan react-router untuk mendapatkan path saat ini dan membuat breadcrumb
 * Menampilkan ikon dan label berdasarkan path yang aktif
 */

import { useLocation, Link } from "react-router-dom";
import { Home, Users, Warehouse, PackageSearch, Menu } from "lucide-react";

export default function Navbar({ onToggleSidebar }) {
    // Mendapatkan lokasi path saat ini dari react-router
    const location = useLocation();
    const path = location.pathname;

    // Mapping judul dan ikon untuk path tertentu agar tampilan rapi dan konsisten
    const titleMap = {
        "/dashboard": { label: "Dashboard", icon: <Home className="w-5 h-5 inline mr-2" /> },
        "/users": { label: "Manajemen User", icon: <Users className="w-5 h-5 inline mr-2" /> },
        "/locations": { label: "Lokasi Gudang", icon: <Warehouse className="w-5 h-5 inline mr-2" /> },
        "/inventory": { label: "Inventaris", icon: <PackageSearch className="w-5 h-5 inline mr-2" /> },
    };

    // Mendapatkan judul dan ikon saat ini berdasarkan path, default jika tidak ada mapping
    const current = titleMap[path] || { label: "Halaman", icon: null };

    // Mendapatkan data user saat ini dari localStorage untuk ditampilkan di navbar
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Membuat breadcrumb dari path dengan memecah path dan membuat link untuk setiap segmen
    const crumbs = path
        .split("/")
        .filter(Boolean)
        .map((crumb, i, arr) => {
        const to = "/" + arr.slice(0, i + 1).join("/");
        return (
            <span key={to}>
            {i > 0 && " / "}
            <Link to={to} className="hover:underline capitalize text-sm text-zinc-300">
                {crumb.replace(/-/g, " ")}
            </Link>
            </span>
        );
        });

    return (
        <header className="bg-zinc-800 text-white px-4 sm:px-6 md:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow gap-2 sm:gap-0">
        <div className="flex items-center gap-2">
            {/* Tombol toggle sidebar untuk tampilan mobile */}
            <button
                className="sm:hidden p-2 rounded hover:bg-zinc-700"
                onClick={onToggleSidebar}
                aria-label="Toggle sidebar"
            >
                <Menu className="w-6 h-6" />
            </button>
            <div>
                {/* Judul halaman dengan ikon */}
                <div className="text-lg font-semibold flex items-center gap-1">
                {current.icon}
                {current.label}
                </div>
                {/* Breadcrumb navigasi */}
                <div className="text-xs mt-1 text-zinc-400">{crumbs}</div>
            </div>
        </div>
        {/* Menampilkan username user saat ini */}
        <div className="text-sm sm:text-base">
            Welcome, <span className="font-bold">{currentUser?.username}</span>
        </div>
        </header>
    );
}
