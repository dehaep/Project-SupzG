/**
 * controllers/user.controller.js
 * Berisi fungsi-fungsi controller untuk operasi CRUD pada model User
 */

import User from "../models/User.js";
import { hashPassword } from "../utils/hashPassword.js";

/**
 * Mendapatkan semua user dari database
 * Mengirimkan data user dalam format JSON
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data user." });
  }
};

/**
 * Menambahkan user baru berdasarkan data yang dikirim di body request
 * Melakukan hashing password sebelum disimpan
 * Mengembalikan data user yang baru dibuat
 */
export const addUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ ...rest, password: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error("[ADD USER ERROR]", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Memperbarui data user berdasarkan id yang dikirim di parameter URL
 * Menggunakan data baru dari body request untuk update
 * Mengembalikan data user yang sudah diperbarui
 */
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, role, status } = req.body;
  try {
    const updated = await User.findByIdAndUpdate(
      id,
      { username, role, status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Gagal update user." });
  }
};

/**
 * Menghapus user berdasarkan id yang dikirim di parameter URL
 * Mengembalikan pesan sukses jika berhasil dihapus
 */
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ message: "User dihapus." });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus user." });
  }
};
