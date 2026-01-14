import mongoose from "mongoose";

/**
 * Video Schema
 * Represents a video uploaded to the platform
 */
const videoSchema = new mongoose.Schema(
  {
    /**
     * Title of the video
     * @type {String}
     */
    title: String,

    /**
     * Description of the video
     * @type {String}
     */
    description: String,

    /**
     * URL to the video thumbnail image
     * @type {String}
     * @required
     */
    thumbnailUrl: {
      type: String,
      required: true,
    },

    /**
     * URL to the video file
     * @type {String}
     * @required
     */
    videoUrl: { type: String, required: true },

    /**
     * Category of the video (e.g., "tech", "gaming", etc.)
     * @type {String}
     */
    category: String,

    /**
     * Reference to the channel this video belongs to
     * @type {mongoose.Schema.Types.ObjectId}
     * @ref Channel
     */
    channel: { type: mongoose.Schema.Types.ObjectId, ref: "Channel" },

    /**
     * Reference to the user who uploaded this video
     * @type {mongoose.Schema.Types.ObjectId}
     * @ref User
     */
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    /**
     * Number of views the video has received
     * @type {Number}
     * @default 0
     */
    views: { type: Number, default: 0 },

    /**
     * Array of user IDs who have liked this video
     * @type {Array<mongoose.Schema.Types.ObjectId>}
     * @ref User
     */
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    /**
     * Array of user IDs who have disliked this video
     * @type {Array<mongoose.Schema.Types.ObjectId>}
     * @ref User
     */
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    /**
     * Duration of the video in seconds
     * @type {Number}
     */
    duration: Number,

    /**
     * Array of tags associated with the video
     * @type {Array<String>}
     */
    tags: [String],
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

export default mongoose.model("Video", videoSchema);
