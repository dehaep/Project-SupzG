/**
 * controllers/transaction.controller.js
 * Berisi fungsi-fungsi controller untuk operasi CRUD pada model Transaction
 */

import Transaction from "../models/Transaction.js";
import Item from "../models/Item.js";

/**
 * Mendapatkan semua transaksi dari database
 * Menggunakan populate untuk mengambil data produk terkait
 * Mengirimkan data transaksi dalam format JSON
 */
export const getAllTransactions = async (req, res) => {
    try {
        const data = await Transaction.find().populate("produk");
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Gagal mengambil transaksi." });
    }
};

/**
 * Membuat transaksi baru berdasarkan data yang dikirim di body request
 * Menyimpan transaksi baru ke database dan mengembalikan data transaksi baru
 */
export const createTransaction = async (req, res) => {
    const { produk, jumlah, tipe, tanggal, user_input } = req.body;
    try {
        const newTx = new Transaction({
            produk,
            jumlah,
            tipe,
            tanggal,
            user_input,
        });
        await newTx.save();
        res.status(201).json(newTx);
    } catch (err) {
        res.status(500).json({ message: "Gagal menambahkan transaksi." });
    }
};

/**
 * Memperbarui status transaksi berdasarkan id yang dikirim di parameter URL
 * Jika status diubah menjadi "approved" dan sebelumnya belum approved,
 * maka akan memperbarui stok produk sesuai tipe transaksi (masuk/keluar)
 * Mengembalikan data transaksi yang sudah diperbarui
 */
export const updateTransactionStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const transaction = await Transaction.findById(id);
        if (!transaction) {
            return res.status(404).json({ message: "Transaksi tidak ditemukan." });
        }

        if (status === "approved" && transaction.status !== "approved") {
            // Update stok berdasarkan tipe transaksi
            const item = await Item.findById(transaction.produk);
            if (!item) {
                return res.status(404).json({ message: "Produk tidak ditemukan." });
            }

            if (transaction.tipe === "masuk") {
                item.stok += transaction.jumlah;
            } else if (transaction.tipe === "keluar") {
                if (item.stok < transaction.jumlah) {
                    return res.status(400).json({ message: "Stok tidak cukup untuk transaksi keluar." });
                }
                item.stok -= transaction.jumlah;
            }

            await item.save();
        }

        transaction.status = status;
        const updated = await transaction.save();

        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Gagal memperbarui status transaksi.", error: err.message });
    }
};

/**
 * Menghapus transaksi berdasarkan id yang dikirim di parameter URL
 * Mengembalikan pesan sukses jika berhasil dihapus
 */
export const deleteTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        await Transaction.findByIdAndDelete(id);
        res.json({ message: "Transaksi dihapus." });
    } catch (err) {
        res.status(500).json({ message: "Gagal menghapus transaksi." });
    }
};
