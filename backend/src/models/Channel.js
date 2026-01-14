import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    channelName: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true,unique: true },
    description: String,
    channelBanner: String,
    subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Channel", channelSchema);
