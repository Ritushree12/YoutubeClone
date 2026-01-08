import Channel from "../models/Channel.js";
import Video from "../models/Video.js";

export const createChannel = async (req, res) => {
  const { channelName, description, channelBanner } = req.body;
  const channel = await Channel.create({
    channelName,
    description,
    channelBanner,
    owner: req.user.id,
  });
  res.status(201).json(channel);
};

export const getChannelVideos = async (req, res) => {
  const channel = await Channel.findById(req.params.id).populate("videos");
  if (!channel) return res.status(404).json({ message: "Channel not found" });
  res.json(channel);
};
