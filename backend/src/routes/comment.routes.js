import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  addComment,
  deleteComment,
  likeComment,
} from "../controllers/comment.controller.js";

const router = express.Router();
router.post("/", protect, addComment);
router.delete("/:id", protect, deleteComment);
router.post("/:id/like", protect, likeComment);

export default router;
