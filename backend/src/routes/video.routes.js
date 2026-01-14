import express from "express";
import multer from "multer";
import { protect } from "../middleware/auth.middleware.js";
import {
  getVideos,
  uploadVideo,
  getVideoById,
  likeVideo,
  dislikeVideo,
  updateVideo,
  deleteVideo,
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
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  uploadVideo
);

router.get("/:id", getVideoById);
router.put("/:id", protect, updateVideo);
router.delete("/:id", protect, deleteVideo);
router.post("/:id/like", protect, likeVideo);
router.post("/:id/dislike", protect, dislikeVideo);

export default router;
