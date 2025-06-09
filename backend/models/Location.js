/**
 * models/Location.js
 * Mendefinisikan skema Mongoose untuk koleksi Location
 * Menentukan tipe data untuk field nama_lokasi dan alamat
 */

import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    nama_lokasi: String, // Nama lokasi
    alamat: String,      // Alamat lokasi
});

export default mongoose.model("Location", locationSchema);
