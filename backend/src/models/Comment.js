import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    video: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String,
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
