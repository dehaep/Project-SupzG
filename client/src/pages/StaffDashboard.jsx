/**
 * client/src/pages/StaffDashboard.jsx
 * Halaman dashboard utama untuk staf gudang
 * Menampilkan sambutan dan ringkasan fitur utama untuk staf
 */

export default function StaffDashboard() {
    // Mengambil data user saat ini dari localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    return (
        <div className="p-6">
        {/* Judul sambutan dengan nama user */}
        <h1 className="text-2xl font-bold mb-4">Selamat datang, {currentUser?.username}</h1>
        <p className="text-zinc-700">Ini adalah beranda utama untuk staf gudang.</p>

        {/* Ringkasan fitur utama staf */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 shadow rounded">
            <h2 className="font-semibold text-lg">Permintaan Barang</h2>
            <p className="text-sm text-zinc-600">Ajukan permintaan barang masuk / keluar.</p>
            </div>
            <div className="bg-white p-4 shadow rounded">
            <h2 className="font-semibold text-lg">Cek Stok Barang</h2>
            <p className="text-sm text-zinc-600">Lihat dan edit stok inventory terbatas.</p>
            </div>
        </div>
        </div>
    );
}
