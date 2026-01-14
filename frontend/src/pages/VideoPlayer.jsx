import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import likeIcon from "../assets/like.png";
import dislikeIcon from "../assets/dislike.png";
import share from "../assets/share.png";
import save from "../assets/bookmark.png";

/**
 * VideoPlayer Component
 * Displays a video with player, comments, and interaction features
 * Handles video playback, likes/dislikes, comments, and subscriptions
 */
const VideoPlayer = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  // Video and UI state
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
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [menuOpenId, setMenuOpenId] = useState(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".comment-menu-container")) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Fetch video data and comments on component mount
  useEffect(() => {
    api.get(`/videos/${id}`).then((res) => {
      setVideo(res.data.video);
      setComments(res.data.comments);
      setLikes(res.data.video.likes.length);
      setDislikes(res.data.video.dislikes.length);
      setSubscribers(res.data.video.channel?.subscribers?.length || 0);
      if (user) {
        setIsLiked(
          res.data.video.likes.some((id) => id.toString() === user._id)
        );
        setIsDisliked(
          res.data.video.dislikes.some((id) => id.toString() === user._id)
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
    api.get("/videos").then((res) => {
      setSuggestedVideos(res.data.filter((v) => v._id !== id).slice(0, 10));
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

  try {
    const channelId = video.channel._id; // Get the channel ID from the populated object

    const res = await api.post(`/channels/${channelId}/subscribe`);

    setSubscribers(res.data.subscribers);
    setIsSubscribed(res.data.isSubscribed);
  } catch (err) {
    console.error("Subscribe error:", err.response || err);
    alert(err.response?.data?.message || "Failed to subscribe");
  }
};


  const handleAddComment = async () => {
    if (!newComment) return;

    const res = await api.post(
      "/comments",
      { videoId: id, text: newComment },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );

    // Ensure the comment has proper user data for immediate display
    const newCommentWithUser = {
      ...res.data,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    };

    setComments([...comments, newCommentWithUser]);
    setNewComment("");
  };

  const handleUpdateComment = async (commentId) => {
    const res = await api.put(
      `/comments/${commentId}`,
      { text: editingText },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    // Ensure the updated comment maintains user data
    const updatedComment = {
      ...res.data,
      user: comments.find((c) => c._id === commentId)?.user || {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    };

    setComments(
      comments.map((c) => (c._id === commentId ? updatedComment : c))
    );
    setEditingId(null);
    setEditingText("");
  };

  const handleDeleteComment = async (commentId) => {
    await api.delete(`/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setComments(comments.filter((c) => c._id !== commentId));
  };

  return video ? (
    <div className="video-player-container">
      <div className="video-main">
        <h2 className="video-player-title">{video.title}</h2>
        <p className="video-player-views">{video.views || 0} views</p>
        <video className="video-player" src={video.videoUrl} controls />
        <div className="channel-info">
          <h3>{video.channel?.channelName || "Unknown Channel"}</h3>
          <button
            className="subscribe-btn"
            onClick={handleSubscribe}
            disabled={!user}
          >
            {isSubscribed ? "Unsubscribe" : "Subscribe"} ({subscribers})
          </button>
        </div>
        <div className="video-info">
          <div className="video-actions-row">
            <button
              className="action-btn like-btn"
              onClick={handleLike}
              disabled={!user}
            >
              <img src={likeIcon} alt="Like" className="icon" /> Like ({likes})
            </button>
            <button
              className="action-btn dislike-btn"
              onClick={handleDislike}
              disabled={!user}
            >
              <img src={dislikeIcon} alt="Dislike" className="icon" /> Dislike (
              {dislikes})
            </button>
            <button className="action-btn share-btn">
              <img src={share} alt="Share" className="icon" /> Share
            </button>
            <button className="action-btn save-btn">
              <img src={save} alt="Save" className="icon" /> Save
            </button>
          </div>

          <p className="video-player-description">{video.description}</p>
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
            <div key={c._id} className="comment-item">
              <div className="comment-header">
                <div className="comment-content">
                  <strong>{c.user.username}:</strong>
                  {editingId === c._id ? (
                    <div className="comment-edit">
                      <input
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="comment-edit-input"
                      />
                      <button
                        onClick={() => handleUpdateComment(c._id)}
                        className="comment-save-btn"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="comment-cancel-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <span className="comment-text"> {c.text}</span>
                  )}
                </div>
                {user &&
                  c.user.username === user.username &&
                  editingId !== c._id && (
                    <div className="comment-menu-container">
                      <button
                        className="comment-menu-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpenId(menuOpenId === c._id ? null : c._id);
                        }}
                      >
                        ⋮
                      </button>
                      {menuOpenId === c._id && (
                        <div className="comment-menu">
                          <button
                            className="comment-menu-item"
                            onClick={() => {
                              setEditingId(c._id);
                              setEditingText(c.text);
                              setMenuOpenId(null);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="comment-menu-item comment-delete-btn"
                            onClick={() => {
                              handleDeleteComment(c._id);
                              setMenuOpenId(null);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="suggested-videos">
        <h3>Suggested Videos</h3>
        {suggestedVideos.map((v) => (
          <Link
            key={v._id}
            to={`/video/${v._id}`}
            className="suggested-video-link"
          >
            <div className="suggested-video-card">
              <img src={v.thumbnailUrl} alt={v.title} />
              <div className="suggested-video-info">
                <h4 className="suggested-video-title">{v.title}</h4>
                <p className="suggested-video-channel">
                  {v.channel?.channelName || "Unknown Channel"}
                </p>
                <p className="suggested-video-description">{v.description}</p>
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
