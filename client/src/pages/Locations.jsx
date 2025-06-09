
/**
 * client/src/pages/Locations.jsx
 * Halaman lokasi gudang yang menampilkan daftar lokasi dan memungkinkan penambahan serta penghapusan lokasi
 * Menggunakan hook useLocations untuk mengambil data lokasi dan API untuk operasi tambah dan hapus lokasi
 */

import { useState } from "react";
import toast from "react-hot-toast";
import { useLocations } from "../hooks/useLocations";
import { addLocation, deleteLocation } from "../api/locations";

export default function Locations() {
    // Mengambil data lokasi dan fungsi refetch dari hook useLocations
    const { data: locations = [], refetch } = useLocations();

    // State untuk menyimpan input lokasi baru
    const [newLocation, setNewLocation] = useState({ nama_lokasi: "", alamat: "" });

    // State untuk mengatur tampilan modal tambah lokasi
    const [showModal, setShowModal] = useState(false);

    // Handler perubahan input form lokasi baru
    const handleChange = (e) => {
        setNewLocation({ ...newLocation, [e.target.name]: e.target.value });
    };

    // Handler submit form tambah lokasi baru
    const handleAddLocation = async (e) => {
        e.preventDefault();
        try {
            const res = await addLocation(newLocation);
            toast.success("Lokasi berhasil ditambahkan!");
            setShowModal(false);
            setNewLocation({ nama_lokasi: "", alamat: "" });
            refetch();
        } catch (err) {
            toast.error("Gagal menambahkan lokasi");
        }
    };

    // Handler hapus lokasi berdasarkan id
    const handleDeleteLocation = async (id) => {
        try {
            await deleteLocation(id);
            toast.success("Lokasi berhasil dihapus!");
            refetch();
        } catch (err) {
            toast.error("Gagal menghapus lokasi");
        }
    };

    return (
        <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <h1 className="text-2xl font-bold">Lokasi Gudang</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-green-600 text-white px-3 py-1.5 rounded whitespace-nowrap text-sm"
                >
                    + Tambah Lokasi
                </button>
            </div>

            <div className="overflow-auto bg-white rounded shadow">
                <table className="min-w-full text-sm">
                    <thead className="bg-zinc-200">
                        <tr>
                            <th className="px-4 py-2 text-left">#</th>
                            <th className="px-4 py-2 text-left">Nama Lokasi</th>
                            <th className="px-4 py-2 text-left">Alamat</th>
                            <th className="px-4 py-2 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locations.map((loc, i) => (
                            <tr key={loc._id} className="border-b hover:bg-zinc-50">
                                <td className="px-4 py-2">{i + 1}</td>
                                <td className="px-4 py-2">{loc.nama_lokasi}</td>
                                <td className="px-4 py-2">{loc.alamat}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleDeleteLocation(loc._id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Tambah Lokasi */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Tambah Lokasi Gudang</h2>
                        <form onSubmit={handleAddLocation} className="space-y-4">
                            <input
                                type="text"
                                name="nama_lokasi"
                                placeholder="Nama Lokasi"
                                value={newLocation.nama_lokasi}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border rounded"
                            />
                            <textarea
                                name="alamat"
                                placeholder="Alamat Lengkap"
                                value={newLocation.alamat}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border rounded"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-3 py-1.5 bg-zinc-300 rounded text-sm"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-3 py-1.5 bg-green-600 text-white rounded text-sm"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
