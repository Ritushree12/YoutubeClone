import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  channelName: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  description: String,
  channelBanner: String,
  subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  isVerified: { type: Boolean, default: false },
});

export default mongoose.model("Channel", channelSchema);