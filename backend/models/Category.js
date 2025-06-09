/**
 * models/Category.js
 * Mendefinisikan skema Mongoose untuk koleksi Category
 * Menentukan tipe data dan aturan validasi untuk field nama
 */

import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true, // Field nama wajib diisi
    unique: true,   // Nama kategori harus unik
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
