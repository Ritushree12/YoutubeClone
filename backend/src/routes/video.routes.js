import express from "express";
import multer from "multer";
import { protect } from "../middleware/auth.middleware.js";
import {
  getVideos,
  uploadVideo,
  getVideoById,
  likeVideo,
  dislikeVideo,
} from "../controllers/video.controller.js";

const router = express.Router();

/* Multer config */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* Routes */
router.get("/", getVideos);

/* 🔥 IMPORTANT FIX HERE */
router.post(
  "/upload",
  protect,
  upload.single("video"), // MUST match frontend
  uploadVideo
);

router.get("/:id", getVideoById);
router.post("/:id/like", protect, likeVideo);
router.post("/:id/dislike", protect, dislikeVideo);

export default router;
