import { useNavigate } from "react-router-dom";
import genericThumbnail from "../assets/noThumbnail.png"

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/video/${video._id}`);
  };

  return (
    <div className="video-card" onClick={handleClick}>
      {/* Thumbnail */}
      <img
        src={video.thumbnailUrl || genericThumbnail}
        alt={video.title}
        className="video-thumbnail"
        onError={(e) => {
          e.target.onerror = null; // Prevents infinite loop if generic also fails
          e.target.src = genericThumbnail;
        }}
      />

      {/* Video Info */}
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-channel">{video.channel?.channelName || "Unknown Channel"}</p>
        <p className="video-views">{video.views || 0} views</p>
      </div>
    </div>
  );
};

export default VideoCard;
