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
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).json({ message: "Comment not found" });

  if (comment.user.toString() !== req.user.id)
    return res.status(403).json({ message: "Not authorized" });

  await comment.remove();
  res.json({ message: "Deleted" });
};
