/**
 * Modul koneksi ke database MongoDB menggunakan mongoose
 * Fungsi connectDB menghubungkan aplikasi ke database dengan URI dari environment variable
 * Menangani error koneksi dan menghentikan aplikasi jika gagal
 */

import mongoose from "mongoose";

/**
 * Fungsi asinkron untuk menghubungkan ke MongoDB
 * Menggunakan URI dari environment variable MONGODB_URI
 * Jika berhasil, akan menampilkan pesan sukses di console
 * Jika gagal, akan menampilkan pesan error dan menghentikan proses aplikasi
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ DB Error:", err.message);
        process.exit(1);
    } 
};

export default connectDB;
