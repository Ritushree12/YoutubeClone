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

  useEffect(() => {
    api.get(`/videos/${id}`).then((res) => {
      setVideo(res.data.video);
      setComments(res.data.comments);
    });
  }, [id]);

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
    <div>
      <h2>{video.title}</h2>
      <video src={video.videoUrl} controls width="800" />
      <p>{video.description}</p>

      {/* Comments */}
      <div>
        <h3>Comments</h3>
        {user && (
          <div>
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add comment..."
            />
            <button onClick={handleAddComment}>Add</button>
          </div>
        )}
        {comments.map((c) => (
          <div key={c._id}>
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
