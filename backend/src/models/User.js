import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,

    channels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channel" }],
    subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channel" }],
    likedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    dislikedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
