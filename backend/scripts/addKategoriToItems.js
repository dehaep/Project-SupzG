/**
 * backend/scripts/addKategoriToItems.js
 * Script untuk menambahkan field kategori pada item yang belum memiliki kategori
 * Menghubungkan ke database, mengambil kategori dan item yang belum ada kategori
 * Menetapkan kategori default pada item yang belum memiliki kategori
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "../models/Item.js";
import Category from "../models/Category.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://dehype:dehaep123@ac-6rxlu7o-shard-00-00.nsvwh6y.mongodb.net:27017,ac-6rxlu7o-shard-00-01.nsvwh6y.mongodb.net:27017,ac-6rxlu7o-shard-00-02.nsvwh6y.mongodb.net:27017/supzgdatabases?replicaSet=atlas-oxmzq8-shard-0&ssl=true&authSource=admin";

async function addKategoriToItems() {
  try {
    await mongoose.connect(MONGODB_URI);

    // Mengambil semua kategori untuk referensi
    const categories = await Category.find();

    // Mengambil semua item yang belum memiliki kategori
    const items = await Item.find({ $or: [{ kategori: { $exists: false } }, { kategori: null }] });

    for (const item of items) {
      // Logika menentukan kategori yang akan diberikan
      // Contoh: memberikan kategori default pertama
      const defaultCategory = categories[0];

      if (defaultCategory) {
        item.kategori = defaultCategory._id;
        await item.save();
        console.log(`Updated item ${item._id} with kategori ${defaultCategory._id}`);
      } else {
        console.log("No categories found to assign");
      }
    }

    console.log("Completed updating items with kategori field.");
    process.exit(0);
  } catch (error) {
    console.error("Error updating items:", error);
    process.exit(1);
  }
}

addKategoriToItems();
