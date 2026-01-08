import Video from "../models/Video.js";

export const getVideos = async (req, res) => {
  const { search, category } = req.query;

  let query = {};

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  if (category) {
    query.category = category;
  }

  const videos = await Video.find(query);
  res.json(videos);
};

export const createVideo = async (req, res) => {
  const video = await Video.create({
    ...req.body,
    uploader: req.user.id,
  });
  res.status(201).json(video);
};
