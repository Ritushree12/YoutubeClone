import mongoose from "mongoose";

/**
 * Channel Schema
 * Represents a YouTube channel created by a user
 */
const channelSchema = new mongoose.Schema(
  {
    /**
     * Name of the channel
     * @type {String}
     * @required
     */
    channelName: { type: String, required: true },

    /**
     * Reference to the user who owns this channel
     * @type {mongoose.Schema.Types.ObjectId}
     * @ref User
     * @required
     * @unique Only one channel per user
     */
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },

    /**
     * Description of the channel
     * @type {String}
     */
    description: String,

    /**
     * URL to the channel banner image
     * @type {String}
     */
    channelBanner: String,

    /**
     * Array of user IDs who have subscribed to this channel
     * @type {Array<mongoose.Schema.Types.ObjectId>}
     * @ref User
     */
    subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    /**
     * Array of video IDs uploaded to this channel
     * @type {Array<mongoose.Schema.Types.ObjectId>}
     * @ref Video
     */
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],

    /**
     * Whether the channel is verified
     * @type {Boolean}
     * @default false
     */
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

export default mongoose.model("Channel", channelSchema);
