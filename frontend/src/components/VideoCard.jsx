import { useNavigate } from "react-router-dom";
import genericThumbnail from "../assets/noThumbnail.png"

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/video/${video._id}`);
  };

  // Use video.channelName if present, else fallback to channel?.channelName
  const channelName = video.channelName || video.channel?.channelName || "Unknown Channel";

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
        <h3 className="video-title" title={video.title} style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textAlign: 'left',
        }}>{video.title}</h3>
        <p className="video-channel">{channelName}</p>
        <p className="video-views">{video.views || 0} views</p>
      </div>
    </div>
  );
};

export default VideoCard;
