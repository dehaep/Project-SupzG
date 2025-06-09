/**
 * client/src/api/sample.js
 * Contoh fungsi API untuk endpoint sample
 * Menggunakan instance axios yang sudah dikonfigurasi
 */

import API from "./axiosInstance";

/**
 * Mendapatkan data dari endpoint /sample
 * @returns Promise dengan data response
 */
export const getHello = async () => {
  const res = await API.get("/sample");
  return res.data;
};
