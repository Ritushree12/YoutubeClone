import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getVideos, createVideo } from "../controllers/video.controller.js";

const router = express.Router();

router.get("/", getVideos);
router.post("/", protect, createVideo);

export default router;
