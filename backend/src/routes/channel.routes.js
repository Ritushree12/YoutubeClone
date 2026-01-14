import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import Channel from "../models/Channel.js";
import {
  createChannel,
  getChannelById,
  getMyChannels,
  toggleSubscribe,
} from "../controllers/channel.controller.js";

const router = express.Router();

// IMPORTANT: Specific routes BEFORE parameterized routes
router.post("/", protect, createChannel);
router.get("/me", protect, async (req, res) => {
  try {
    const channels = await Channel.find({ owner: req.user.id })
      .populate("videos");
    res.json(channels);
  } catch (error) {
    console.error("Error fetching user channels:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/:id", getChannelById);
router.post("/:id/subscribe", protect, toggleSubscribe);

export default router;
