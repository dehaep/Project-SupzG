/**
 * client/src/api/categories.js
 * Fungsi API untuk operasi kategori
 * Menggunakan instance axios yang sudah dikonfigurasi
 */

import API from './axiosInstance';

/**
 * Mendapatkan semua kategori dari backend
 * @returns Promise dengan data kategori
 */
export const getCategories = () => API.get("/categories").then(res => res.data);

/**
 * Menambahkan kategori baru ke backend
 * @param {Object} data - Data kategori baru
 * @returns Promise hasil post
 */
export const addCategory = (data) => API.post("/categories", data);

/**
 * Menghapus kategori berdasarkan id
 * @param {string} id - ID kategori yang akan dihapus
 * @returns Promise hasil delete
 */
export const deleteCategory = (id) => API.delete(`/categories/${id}`);
