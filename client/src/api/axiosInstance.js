/**
 * client/src/api/axiosInstance.js
 * Membuat instance axios dengan baseURL backend API
 * Menambahkan interceptor untuk menyisipkan token Authorization dari localStorage
 */

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: false, // Disable sending cookies, use Authorization header instead
});

// Menambahkan interceptor request untuk menyisipkan token Authorization
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
