/**
 * controllers/location.controller.js
 * Berisi fungsi-fungsi controller untuk operasi CRUD pada model Location
 */

import Location from "../models/Location.js";

/**
 * Mendapatkan semua lokasi dari database
 * Mengirimkan data lokasi dalam format JSON
 */
export const getAllLocations = async (req, res) => {
    try {
        const data = await Location.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Gagal mengambil lokasi." });
    }
};

/**
 * Membuat lokasi baru berdasarkan data yang dikirim di body request
 * Menyimpan lokasi baru ke database dan mengembalikan data lokasi baru
 */
export const createLocation = async (req, res) => {
    console.log("Request body in createLocation:", req.body);
    const { nama_lokasi, alamat } = req.body;
    try {
        const newLocation = new Location({ nama_lokasi, alamat });
        await newLocation.save();
        res.status(201).json(newLocation);
    } catch (err) {
        console.error("Error in createLocation:", err);
        res.status(500).json({ message: "Gagal menambahkan lokasi." });
    }
};

/**
 * Memperbarui data lokasi berdasarkan id yang dikirim di parameter URL
 * Menggunakan data baru dari body request untuk update
 * Mengembalikan data lokasi yang sudah diperbarui
 */
export const updateLocation = async (req, res) => {
    const { id } = req.params;
    const { nama_lokasi, alamat } = req.body;
    try {
        const updated = await Location.findByIdAndUpdate(
            id,
            { nama_lokasi, alamat },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Gagal memperbarui lokasi." });
    }
};

/**
 * Menghapus lokasi berdasarkan id yang dikirim di parameter URL
 * Mengembalikan pesan sukses jika berhasil dihapus
 */
export const deleteLocation = async (req, res) => {
    const { id } = req.params;
    try {
        await Location.findByIdAndDelete(id);
        res.json({ message: "Lokasi dihapus." });
    } catch (err) {
        res.status(500).json({ message: "Gagal menghapus lokasi." });
    }
};
