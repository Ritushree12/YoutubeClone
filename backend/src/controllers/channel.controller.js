import Channel from "../models/Channel.js";
import User from "../models/User.js";
import mongoose from "mongoose";

/**
 * CREATE CHANNEL
 */
export const createChannel = async (req, res) => {
  try {
    // Check if user already has a channel
    const existingChannel = await Channel.findOne({ owner: req.user.id });
    if (existingChannel) {
      return res.status(400).json({ message: "User can only have one channel" });
    }

  

    const { channelName, description, channelBanner } = req.body;

    const channel = await Channel.create({
      channelName,
      description,
      channelBanner,
      owner: req.user.id,
    });

    // 🔥 link channel to user
    await User.findByIdAndUpdate(req.user.id, {
      $push: { channels: channel._id },
    });

    res.status(201).json(channel);
  } catch (err) {
     if (err.code === 11000) {
    return res.status(400).json({
      message: "User already has a channel"
    });
  }
    console.error("Create channel error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET CHANNEL BY ID
 */
export const getChannelById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid channel ID format" });
    }

    const channel = await Channel.findById(id)
      .populate("owner", "username")
      .populate("subscribers", "username")
      .populate("videos");

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.json(channel);
  } catch (error) {
    console.error("Get channel by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET ALL CHANNELS OF LOGGED-IN USER
 */
export const getMyChannels = async (req, res) => {
  const channels = await Channel.find({ owner: req.user.id });
  res.json(channels);
};

/**
 * SUBSCRIBE / UNSUBSCRIBE
 */

export const toggleSubscribe = async (req, res) => {
  try {
    const channelId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(channelId)) {
      return res.status(400).json({ message: "Invalid channel ID" });
    }

    const channel = await Channel.findById(channelId);
    if (!channel) return res.status(404).json({ message: "Channel not found" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (channel.owner.toString() === req.user.id) {
      return res.status(400).json({ message: "Cannot subscribe to your own channel" });
    }

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

    res.json({
      subscribers: channel.subscribers.length,
      isSubscribed: !isSubscribed,
    });
  } catch (err) {
    console.error("Toggle subscribe error:", err.message, err.stack);
    res.status(500).json({ message: "Server error while toggling subscription" });
  }
};