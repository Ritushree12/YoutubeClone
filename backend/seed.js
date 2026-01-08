import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./src/models/User.js";
import Channel from "./src/models/Channel.js";
import Video from "./src/models/Video.js";
import Comment from "./src/models/Comment.js";

dotenv.config();

const userId = new mongoose.Types.ObjectId();
const hashedPassword = await bcrypt.hash("password123", 10);
const channelId = new mongoose.Types.ObjectId();
const videoId = new mongoose.Types.ObjectId();
const commentId = new mongoose.Types.ObjectId();

const data = {
  users: [
    {
      _id: userId,
      username: "JohnDoe",
      email: "john@example.com",
      password: hashedPassword,
      channels: [channelId],
    },
  ],
  channels: [
    {
      _id: channelId,
      channelName: "Code with John",
      owner: userId,
      description: "Coding tutorials and tech reviews",
      channelBanner: "https://example.com/banner.png",
      subscribers: [],
      videos: [videoId],
      isVerified: false,
    },
  ],
  videos: [
    {
      _id: videoId,
      title: "Learn React in 30 Minutes",
      description: "Quick React tutorial",
      thumbnailUrl: "https://example.com/thumb.png",
      videoUrl: "https://example.com/video.mp4",
      category: "Education",
      channel: channelId,
      uploader: userId,
      views: 15200,
      likes: [],
      dislikes: [],
      duration: 1800, // 30 minutes in seconds
      tags: ["React", "Tutorial", "JavaScript"],
    },
  ],
  comments: [
    {
      _id: commentId,
      video: videoId,
      user: userId,
      text: "Great video!",
    },
  ],
};

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await User.deleteMany();
    await Channel.deleteMany();
    await Video.deleteMany();
    await Comment.deleteMany();

    await User.insertMany(data.users);
    await Channel.insertMany(data.channels);
    await Video.insertMany(data.videos);
    await Comment.insertMany(data.comments);

    console.log("Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
