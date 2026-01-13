import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import likeIcon from "../assets/like.png";
import dislikeIcon from "../assets/dislike.png";

const VideoPlayer = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [subscribers, setSubscribers] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [suggestedVideos, setSuggestedVideos] = useState([]);

  useEffect(() => {
    api.get(`/videos/${id}`).then((res) => {
      setVideo(res.data.video);
      setComments(res.data.comments);
      setLikes(res.data.video.likes.length);
      setDislikes(res.data.video.dislikes.length);
      setSubscribers(res.data.video.channel?.subscribers?.length || 0);
      if (user) {
        setIsLiked(
          res.data.video.likes.some((id) => id.toString() === user.id)
        );
        setIsDisliked(
          res.data.video.dislikes.some((id) => id.toString() === user.id)
        );
        if (res.data.video.channel) {
          setIsSubscribed(
            res.data.video.channel.subscribers.some(
              (id) => id.toString() === user.id
            )
          );
        }
      }
    });

    // Fetch suggested videos
    api.get('/videos').then((res) => {
      setSuggestedVideos(res.data.filter(v => v._id !== id).slice(0, 10));
    });
  }, [id, user]);

  const handleLike = async () => {
    const res = await api.post(
      `/videos/${id}/like`,
      {},
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    setLikes(res.data.likes);
    setDislikes(res.data.dislikes);
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
  };

  const handleDislike = async () => {
    const res = await api.post(
      `/videos/${id}/dislike`,
      {},
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    setLikes(res.data.likes);
    setDislikes(res.data.dislikes);
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
  };

  const handleSubscribe = async () => {
    if (!video.channel) return;
    const res = await api.post(
      `/channels/${video.channel._id}/subscribe`,
      {},
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    setSubscribers(res.data.subscribers);
    setIsSubscribed(!isSubscribed);
  };

  const handleAddComment = async () => {
    if (!newComment) return;
    const res = await api.post(
      "/comments",
      { videoId: id, text: newComment },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    setComments([...comments, res.data]);
    setNewComment("");
  };

  return video ? (
    <div className="video-player-container">
      <div className="video-main">
        <h2>{video.title}</h2>
        <video src={video.videoUrl} controls />

        <div className="video-info">
          <div className="video-actions">
            <button onClick={handleLike} disabled={!user}>
              <img src={likeIcon} alt="Like" className="icon" /> Like ({likes})
            </button>
            <button onClick={handleDislike} disabled={!user}>
              <img src={dislikeIcon} alt="Dislike" className="icon" /> Dislike ({dislikes})
            </button>
          </div>

          <div className="channel-info">
            <h3>{video.channel?.channelName || "Unknown Channel"}</h3>
            <button onClick={handleSubscribe} disabled={!user}>
              {isSubscribed ? "Unsubscribe" : "Subscribe"} ({subscribers})
            </button>
          </div>
        </div>

        <div className="comments-section">
          <h3>Comments</h3>
          {user && (
            <div className="comment-form">
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add comment..."
              />
              <button onClick={handleAddComment}>Add</button>
            </div>
          )}
          {comments.map((c) => (
            <div key={c._id} className="comment">
              <strong>{c.user.username}:</strong> {c.text}
            </div>
          ))}
        </div>
      </div>

      <div className="suggested-videos">
        <h3>Suggested Videos</h3>
        {suggestedVideos.map((v) => (
          <Link key={v._id} to={`/video/${v._id}`} className="suggested-video-link">
            <div className="suggested-video-card">
              <img src={v.thumbnailUrl} alt={v.title} />
              <div className="suggested-video-info">
                <h4>{v.title}</h4>
                <p>{v.channel?.channelName}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default VideoPlayer;
