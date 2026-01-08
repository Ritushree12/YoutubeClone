import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  getVideos,
  createVideo,
  uploadVideo,
  getVideoById,
  likeVideo,
  dislikeVideo,
} from "../controllers/video.controller.js";
import multer from "multer";

const router = express.Router();

const upload = multer();

router.get("/", getVideos);
router.post("/", protect, createVideo);
router.post("/upload", protect, upload.any(), uploadVideo);
router.get("/:id", getVideoById);
router.post("/:id/like", protect, likeVideo);
router.post("/:id/dislike", protect, dislikeVideo);

export default router;
