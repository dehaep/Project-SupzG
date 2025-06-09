/**
 * client/src/layout.jsx
 * Komponen layout utama aplikasi
 * Mengatur sidebar dan navbar serta area konten utama dengan routing outlet
 */

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export default function Layout() {
  // State untuk mengatur status sidebar terbuka atau tertutup
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fungsi untuk toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar dengan prop isOpen dan onClose */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-auto bg-gray-50">
        {/* Navbar dengan prop onToggleSidebar */}
        <Navbar onToggleSidebar={toggleSidebar} />
        {/* Area konten utama yang diisi oleh komponen route anak */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
