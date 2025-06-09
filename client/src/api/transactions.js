// src/api/transactions.js

import API from './axiosInstance';

export const getTransactions = () => API.get("/transactions").then(res => res.data);

export const addTransaction = (data) => API.post("/transactions", data);
