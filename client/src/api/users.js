// src/api/users.js

import API from './axiosInstance';

export const getUsers = () => API.get("/users").then(res => res.data);

export const addUser = (data) => API.post("/users", data);

export const loginUser = (data) => API.post("/auth/login", data).then(res => res.data);
