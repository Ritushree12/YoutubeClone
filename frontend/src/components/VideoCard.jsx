import ReactPlayer from "react-player";

const VideoCard = ({ video }) => (
  <div className="video-card">
    <ReactPlayer url={video.videoUrl} controls width="100%" />
    <h3>{video.title}</h3>
  </div>
);


export default VideoCard;
