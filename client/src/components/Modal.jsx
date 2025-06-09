/**
 * client/src/components/Modal.jsx
 * Komponen modal sederhana yang menampilkan konten di tengah layar dengan overlay gelap
 * Memiliki tombol tutup (X) di pojok kanan atas
 * Props:
 * - title: judul modal (opsional)
 * - onClose: fungsi callback saat tombol tutup diklik
 * - children: konten modal
 */

import { X } from "lucide-react";

export default function Modal({ title, onClose, children }) {
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4 sm:p-6 md:p-8">
            <div className="relative bg-white rounded shadow-lg p-4 sm:p-6 md:p-8 pt-12 w-full max-w-xl">
                {/* Tombol tutup modal */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-900"
                >
                    <X size={20} />
                </button>

                {/* Judul modal jika ada */}
                {title && (
                    <h2 className="text-xl font-bold mb-4 text-zinc-800 text-center">{title}</h2>
                )}

                {/* Konten modal */}
                {children}
            </div>
        </div>
    );
}
