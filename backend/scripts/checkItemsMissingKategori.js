/**
 * backend/scripts/checkItemsMissingKategori.js
 * Script untuk mengecek jumlah item yang belum memiliki field kategori
 * Menghubungkan ke database, menghitung item tanpa kategori, dan menampilkan hasil
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "../models/Item.js";

dotenv.config();

const MONGODB_URI = "mongodb://dehype:dehaep123@ac-6rxlu7o-shard-00-00.nsvwh6y.mongodb.net:27017,ac-6rxlu7o-shard-00-01.nsvwh6y.mongodb.net:27017,ac-6rxlu7o-shard-00-02.nsvwh6y.mongodb.net:27017/supzgdatabases?replicaSet=atlas-oxmzq8-shard-0&ssl=true&authSource=admin";

async function checkItemsMissingKategori() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Menghitung jumlah item yang tidak memiliki field kategori
    const count = await Item.countDocuments({ kategori: { $exists: false } });
    console.log(`Number of items missing kategori field: ${count}`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error checking items:", error);
    process.exit(1);
  }
}

checkItemsMissingKategori();
