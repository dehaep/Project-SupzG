/**
 * routes/auth.routes.js
 * Route untuk autentikasi user: login dan mendapatkan data user saat ini
 */

import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // Digunakan untuk membandingkan hash password
import { hashPassword } from '../utils/hashPassword.js';

const router = express.Router();

/**
 * Route POST /login
 * Menerima identifier (email atau username) dan password
 * Melakukan validasi user dan password
 * Mengembalikan token JWT dan data user jika berhasil login
 */
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;

  try {
    // Cari user berdasarkan email atau username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(404).json({ message: 'Email/Username tidak ditemukan' });
    }

    if (user.status === 'nonaktif') {
      return res.status(403).json({ message: 'Akun ini dinonaktifkan' });
    }

    // Bandingkan password yang dikirim dengan hash password di database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Password salah' });
    }

    // Buat token JWT dengan payload id user dan masa berlaku 1 hari
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "supzg-secret", {
      expiresIn: '1d',
    });

    // Kirim token dan data user ke client
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Login gagal', error: err.message });
  }
});

/**
 * Route GET /me
 * Mengambil data user saat ini berdasarkan token JWT yang disimpan di cookie
 * Mengembalikan data user tanpa password
 */
router.get('/me', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verifikasi token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supzg-secret");
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Kirim data user ke client
    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;
