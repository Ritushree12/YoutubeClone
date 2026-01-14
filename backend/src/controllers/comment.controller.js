import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  const { videoId, text } = req.body;

  try {
    // Create comment
    const comment = await Comment.create({
      video: videoId,
      user: req.user.id,
      text,
    });

    // Populate the user field
    const populatedComment = await Comment.findById(comment._id).populate({
      path: "user",
      select: "username email", // only get username and email
    });

    res.status(201).json(populatedComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // ✅ ONLY comment owner can delete
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can delete only your comment" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { text } = req.body;
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    comment.text = text;
    await comment.save();

    const populatedComment = await Comment.findById(comment._id).populate({
      path: "user",
      select: "username email",
    });

    res.json(populatedComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const likeComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id).populate("user");
  if (!comment) return res.status(404).json({ message: "Comment not found" });

  const userId = req.user.id;
  const isLiked = comment.likes.includes(userId);

  if (isLiked) {
    comment.likes.pull(userId);
  } else {
    comment.likes.push(userId);
  }

  await comment.save();
  res.json({ likes: comment.likes.length });
};
