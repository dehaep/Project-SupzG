/**
 * backend/scripts/hashExistingPasswords.js
 * Script untuk melakukan hashing password user yang belum di-hash
 * Menghubungkan ke database, mengambil semua user, dan mengupdate password yang belum di-hash
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'your mongo link, to rehash password';

async function hashPasswords() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to database');

    const users = await User.find({});
    console.log(`Found ${users.length} users`);

    for (const user of users) {
      // Cek apakah password sudah di-hash (bcrypt hash diawali dengan $2)
      if (!user.password.startsWith('$2')) {
        const hashed = await bcrypt.hash(user.password, 10);
        user.password = hashed;
        await user.save();
        console.log(`Hashed password for user: ${user.username}`);
      } else {
        console.log(`Password already hashed for user: ${user.username}`);
      }
    }

    console.log('Password hashing complete');
    process.exit(0);
  } catch (error) {
    console.error('Error hashing passwords:', error);
    process.exit(1);
  }
}

hashPasswords();
