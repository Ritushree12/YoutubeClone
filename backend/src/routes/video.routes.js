import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getVideos, createVideo } from "../controllers/video.controller.js";
import { getVideoById } from "../controllers/video.controller.js";

const router = express.Router();

router.get("/", getVideos);
router.post("/", protect, createVideo);
router.get("/:id", getVideoById);

export default router;
