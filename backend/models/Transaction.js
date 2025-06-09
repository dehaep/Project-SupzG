/**
 * models/Transaction.js
 * Mendefinisikan skema Mongoose untuk koleksi Transaction
 * Menentukan tipe data dan relasi dengan koleksi Item
 * Menyimpan informasi jumlah, tipe transaksi, tanggal, status, dan user input
 */

import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    produk: { type: mongoose.Schema.Types.ObjectId, ref: "Item" }, // Referensi ke produk (Item)
    jumlah: Number, // Jumlah produk yang ditransaksikan
    tipe: { type: String, enum: ["masuk", "keluar"] }, // Tipe transaksi: masuk atau keluar
    tanggal: { type: String }, // Tanggal transaksi dalam format "yyyy-mm-dd"
    status: { type: String, enum: ["pending", "approved"], default: "pending" }, // Status transaksi
    user_input: { type: String }, // User yang melakukan input transaksi
});

export default mongoose.model("Transaction", transactionSchema);
