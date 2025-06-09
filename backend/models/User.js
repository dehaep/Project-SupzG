/**
 * models/User.js
 * Mendefinisikan skema Mongoose untuk koleksi User
 * Menentukan tipe data, validasi, dan enum untuk field user
 */

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Username unik dan wajib
    email:    { type: String, required: true, unique: true }, // Email unik dan wajib
    password: { type: String }, // Password user (hashed)
    role:     { type: String, enum: ["staff", "manager"], default: "staff" }, // Role user
    status:   { type: String, default: "aktif" }, // Status user (aktif/nonaktif)
    createdAt: Date, // Tanggal pembuatan user
    updatedAt: Date, // Tanggal update user terakhir
});

const User = mongoose.model("User", userSchema);
export default User;
