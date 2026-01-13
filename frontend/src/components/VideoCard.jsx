import { useNavigate } from "react-router-dom";
import "./VideoCard.css"; // import the CSS file

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/video/${video._id}`);
  };

  return (
    <div className="video-card" onClick={handleClick}>
      {/* Thumbnail */}
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="video-thumbnail"
      />

      {/* Video Info */}
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-meta">
          {video.description?.length > 100
            ? video.description.slice(0, 100) + "..."
            : video.description || "No description available"}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
