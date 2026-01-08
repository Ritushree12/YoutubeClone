const VideoCard = ({ video }) => (
  <div>
    <img src={video.thumbnailUrl} />
    <h4>{video.title}</h4>
    <p>{video.channel?.channelName}</p>
    <p>{video.views} views</p>
  </div>
);

export default VideoCard;
