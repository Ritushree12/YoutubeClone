import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    thumbnailUrl: String,
    videoUrl: String,
    category: String,
    channel: { type: mongoose.Schema.Types.ObjectId, ref: "Channel" },
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    views: { type: Number, default: 0 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    duration: Number,
    tags: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);
