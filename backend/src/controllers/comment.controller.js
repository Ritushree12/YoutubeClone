import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  const { videoId, text } = req.body;
  const comment = await Comment.create({
    video: videoId,
    user: req.user.id,
    text,
  });
  res.status(201).json(comment);
};
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params; // comment ID
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Only allow owner to delete
    if (comment.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    // Delete using deleteOne
    await comment.deleteOne();

    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const updateComment = async (req, res) => {
  const { text } = req.body;
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).json({ message: "Comment not found" });

  if (comment.user.toString() !== req.user.id)
    return res.status(403).json({ message: "Not authorized" });

  comment.text = text;
  await comment.save();
  res.json(comment);
};

export const likeComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);
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
