import express from "express";

import {
    getAllItems,
    createItem,
    updateItem,
    deleteItem,
} from "../controllers/item.controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllItems);
router.post("/", verifyToken, upload.single("foto"), createItem);
router.put("/:id", verifyToken, upload.single("foto"), updateItem);
router.delete("/:id", verifyToken, deleteItem);

export default router;
