/**
 * client/src/pages/NotFound.jsx
 * Halaman yang ditampilkan saat rute tidak ditemukan (404)
 * Menampilkan pesan error sederhana
 */

export default function NotFound() {
    return (
        <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl text-red-500">404 - Halaman tidak ditemukan</h1>
        </div>
    );
}
