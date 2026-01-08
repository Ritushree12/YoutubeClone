import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

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
    <div className="container video-player">
      <h2>{video.title}</h2>
      <video src={video.videoUrl} controls />

      <div className="video-info">
        <div className="video-actions">
          <button onClick={handleLike} disabled={!user}>
            👍 Like ({likes})
          </button>
          <button onClick={handleDislike} disabled={!user}>
            👎 Dislike ({dislikes})
          </button>
        </div>

        <div>
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
  ) : (
    <p>Loading...</p>
  );
};

export default VideoPlayer;
