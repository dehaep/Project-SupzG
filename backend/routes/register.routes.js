/**
 * routes/register.routes.js
 * Route untuk registrasi user baru
 * Melakukan validasi user unik dan hashing password sebelum simpan
 */

import express from 'express';
import User from '../models/User.js';
import { hashPassword } from '../utils/hashPassword.js';

const router = express.Router();

/**
 * Route POST /register
 * Menerima data username, email, password, dan role
 * Mengecek apakah user dengan email atau username sudah ada
 * Jika belum, melakukan hashing password dan menyimpan user baru
 * Mengembalikan pesan sukses atau error
 */
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      status: 'active',
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

export default router;
