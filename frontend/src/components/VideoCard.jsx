import { Link } from "react-router-dom";

const VideoCard = ({ video }) => (
  <Link to={`/video/${video._id}`} className="video-card">
    <img src={video.thumbnailUrl} alt={video.title} />
    <h4>{video.title}</h4>
    <p>{video.channel?.channelName}</p>
    <p>{video.views} views</p>
  </Link>
);

export default VideoCard;
