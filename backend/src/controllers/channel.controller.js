// import Channel from "../models/Channel.js";
// import Video from "../models/Video.js";

// export const createChannel = async (req, res) => {
//   const { channelName, description, channelBanner } = req.body;
//   const channel = await Channel.create({
//     channelName,
//     description,
//     channelBanner,
//     owner: req.user.id,
//   });
//   res.status(201).json(channel);
// };

// export const getChannelVideos = async (req, res) => {
//   const channel = await Channel.findById(req.params.id).populate("videos");
//   if (!channel) return res.status(404).json({ message: "Channel not found" });
//   res.json(channel);
// };

import Channel from "../models/Channel.js";
import User from "../models/User.js";

/**
 * CREATE CHANNEL
 */
export const createChannel = async (req, res) => {
  try {
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
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET CHANNEL BY ID
 */
export const getChannelById = async (req, res) => {
  const channel = await Channel.findById(req.params.id)
    .populate("owner", "username")
    .populate("subscribers", "username")
    .populate("videos");

  if (!channel) {
    return res.status(404).json({ message: "Channel not found" });
  }

  res.json(channel);
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
  const channel = await Channel.findById(req.params.id);
  if (!channel) return res.status(404).json({ message: "Channel not found" });

  if (channel.owner.toString() === req.user.id) {
    return res.status(400).json({ message: "Cannot subscribe to your own channel" });
  }

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
};
