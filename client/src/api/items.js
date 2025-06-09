/**
 * client/src/api/items.js
 * Fungsi API untuk operasi item
 * Menggunakan instance axios yang sudah dikonfigurasi
 */

import API from './axiosInstance';

/**
 * Mendapatkan semua item dari backend
 * @returns Promise dengan data item
 */
export const getItems = () => API.get("/items").then(res => res.data);

/**
 * Menambahkan item baru ke backend
 * @param {Object} data - Data item baru
 * @returns Promise hasil post
 */
export const addItem = (data) => API.post("/items", data);
