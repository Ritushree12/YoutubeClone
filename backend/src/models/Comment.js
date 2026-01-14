import mongoose from "mongoose";

/**
 * Comment Schema
 * Represents a comment on a video
 */
const commentSchema = new mongoose.Schema({
  /**
   * Reference to the video this comment belongs to
   * @type {mongoose.Schema.Types.ObjectId}
   * @ref Video
   * @required
   */
  video: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true },

  /**
   * Reference to the user who made this comment
   * @type {mongoose.Schema.Types.ObjectId}
   * @ref User
   * @required
   */
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  /**
   * Text content of the comment
   * @type {String}
   * @required
   */
  text: { type: String, required: true },

  /**
   * Array of comment IDs that are replies to this comment
   * @type {Array<mongoose.Schema.Types.ObjectId>}
   * @ref Comment
   */
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],

  /**
   * Array of user IDs who have liked this comment
   * @type {Array<mongoose.Schema.Types.ObjectId>}
   * @ref User
   */
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true }); // Adds createdAt and updatedAt fields

export default mongoose.model("Comment", commentSchema);
