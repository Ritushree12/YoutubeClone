import Video from "../models/Video.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";
import Channel from "../models/Channel.js";

export const getVideos = async (req, res) => {
  const { search, category } = req.query;

  let query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } }
    ];
  }

  if (category) {
    query.category = category;
  }

  const videos = await Video.find(query).populate("uploader channel");
  res.json(videos);
};

export const createVideo = async (req, res) => {
  const video = await Video.create({
    ...req.body,
    uploader: req.user.id,
  });
  res.status(201).json(video);
};

export const uploadVideo = async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;

    const videoFile = req.files?.video?.[0];
    const thumbnailFile = req.files?.thumbnail?.[0];

    if (!videoFile || !thumbnailFile) {
      return res.status(400).json({
        message: "Video and thumbnail required",
      });
    }

    const videoUrl = `${process.env.BASE_URL}/uploads/${videoFile.filename}`;
    const thumbnailUrl = `${process.env.BASE_URL}/uploads/${thumbnailFile.filename}`;

    // Find user's channel
    const userChannel = await Channel.findOne({ owner: req.user.id });
    if (!userChannel) {
      return res.status(400).json({
        message: "User must create a channel first",
      });
    }

    const video = await Video.create({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      category,
      tags: tags ? tags.split(",") : [],
      uploader: req.user.id,
      channel: userChannel._id,
    });

    // Push video into channel
    await Channel.findByIdAndUpdate(userChannel._id, {
      $push: { videos: video._id },
    });

    res.status(201).json(video);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error during upload" });
  }
};

export const getVideoById = async (req, res) => {
  const video = await Video.findById(req.params.id).populate(
    "channel uploader likes dislikes"
  );
  if (!video) return res.status(404).json({ message: "Video not found" });

  const comments = await Comment.find({ video: video._id }).populate(
    "user likes"
  );
  res.json({ video, comments });
};

export const likeVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) return res.status(404).json({ message: "Video not found" });

  const userId = req.user.id;
  const isLiked = video.likes.includes(userId);
  const isDisliked = video.dislikes.includes(userId);

  if (isLiked) {
    video.likes.pull(userId);
  } else {
    video.likes.push(userId);
    if (isDisliked) video.dislikes.pull(userId);
  }

  await video.save();
  res.json({ likes: video.likes.length, dislikes: video.dislikes.length });
};

export const dislikeVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) return res.status(404).json({ message: "Video not found" });

  const userId = req.user.id;
  const isLiked = video.likes.includes(userId);
  const isDisliked = video.dislikes.includes(userId);

  if (isDisliked) {
    video.dislikes.pull(userId);
  } else {
    video.dislikes.push(userId);
    if (isLiked) video.likes.pull(userId);
  }

  await video.save();
  res.json({ likes: video.likes.length, dislikes: video.dislikes.length });
};
