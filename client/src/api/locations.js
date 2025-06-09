/**
 * client/src/api/locations.js
 * Fungsi API untuk operasi lokasi
 * Menggunakan instance axios yang sudah dikonfigurasi
 */

import API from './axiosInstance';

/**
 * Mendapatkan semua lokasi dari backend
 * @returns Promise dengan data lokasi
 */
export const getLocations = () => API.get("/locations").then(res => res.data);

/**
 * Menambahkan lokasi baru ke backend
 * @param {Object} data - Data lokasi baru
 * @returns Promise hasil post
 */
export const addLocation = (data) => API.post("/locations", data);

/**
 * Menghapus lokasi berdasarkan id
 * @param {string} id - ID lokasi yang akan dihapus
 * @returns Promise hasil delete
 */
export const deleteLocation = (id) => API.delete(`/locations/${id}`);
