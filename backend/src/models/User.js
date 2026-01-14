import mongoose from "mongoose";

/**
 * User Schema
 * Represents a registered user of the platform
 */
const userSchema = new mongoose.Schema(
  {
    /**
     * Username of the user
     * @type {String}
     */
    username: String,

    /**
     * Email address of the user (used for login)
     * @type {String}
     */
    email: String,

    /**
     * Hashed password for authentication
     * @type {String}
     */
    password: String,

    /**
     * Array of channel IDs owned by this user
     * @type {Array<mongoose.Schema.Types.ObjectId>}
     * @ref Channel
     */
    channels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channel" }],

    /**
     * Array of channel IDs this user has subscribed to
     * @type {Array<mongoose.Schema.Types.ObjectId>}
     * @ref Channel
     */
    subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channel" }],

    /**
     * Array of video IDs this user has liked
     * @type {Array<mongoose.Schema.Types.ObjectId>}
     * @ref Video
     */
    likedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],

    /**
     * Array of video IDs this user has disliked
     * @type {Array<mongoose.Schema.Types.ObjectId>}
     * @ref Video
     */
    dislikedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

export default mongoose.model("User", userSchema);
