/**
 * models/Item.js
 * Mendefinisikan skema Mongoose untuk koleksi Item
 * Menentukan tipe data dan relasi dengan koleksi lain (Location, Category)
 */

import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  nama: { type: String, required: true }, // Nama produk, wajib diisi
  deskripsi: { type: String, default: "" }, // Deskripsi produk, opsional
  stok: { type: Number, default: 0 }, // Jumlah stok produk, default 0
  lokasi: { type: mongoose.Schema.Types.ObjectId, ref: "Location" }, // Referensi ke lokasi produk
  kategori: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Referensi ke kategori produk
  foto: { type: String, default: "" }, // URL atau path foto produk
  harga: { type: Number, default: 0 }, // Harga produk, default 0
});

export default mongoose.model("Item", itemSchema);
