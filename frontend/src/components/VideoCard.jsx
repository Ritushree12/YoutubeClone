import { useNavigate } from "react-router-dom";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to video page
    navigate(`/video/${video._id}`);
  };

  return (
    <div
      className="video-card"
      onClick={handleClick}
      style={{ cursor: "pointer", width: "300px", margin: "10px" }}
    >
      {/* Thumbnail */}
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      {/* Video Info */}
      <div style={{ padding: "8px 0" }}>
        <h3 style={{ margin: "4px 0", fontSize: "16px", fontWeight: "bold" }}>
          {video.title}
        </h3>
        <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
          {video.description?.length > 100
            ? video.description.slice(0, 100) + "..."
            : video.description || "No description available"}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
