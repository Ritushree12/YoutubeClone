import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import Channel from "../models/Channel.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const channel = await Channel.findById(req.params.id).populate(
    "owner subscribers videos"
  );
  if (!channel) return res.status(404).json({ message: "Channel not found" });
  res.json(channel);
});

router.post("/:id/subscribe", protect, async (req, res) => {
  const channel = await Channel.findById(req.params.id);
  if (!channel) return res.status(404).json({ message: "Channel not found" });

  const user = await User.findById(req.user.id);
  const isSubscribed = channel.subscribers.includes(req.user.id);

  if (isSubscribed) {
    channel.subscribers.pull(req.user.id);
    user.subscriptions.pull(channel._id);
  } else {
    channel.subscribers.push(req.user.id);
    user.subscriptions.push(channel._id);
  }

  await channel.save();
  await user.save();
  res.json({ subscribers: channel.subscribers.length });
});

export default router;

