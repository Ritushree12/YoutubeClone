 import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createChannel,
  getChannelById,
  getMyChannels,
  toggleSubscribe,
} from "../controllers/channel.controller.js";

const router = express.Router();

router.post("/", protect, createChannel);
// router.get("/me", protect, getMyChannels);
router.get("/:id", getChannelById);
router.post("/:id/subscribe", protect, toggleSubscribe);
router.get("/me", protect, async (req, res) => {
  const channels = await Channel.find({ owner: req.user.id })
    .populate("videos");

  res.json(channels);
});
export default router;
