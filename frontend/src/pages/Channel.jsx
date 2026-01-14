import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";
import CreateChannelModal from "../components/CreateChannelModal";

/**
 * Channel Component
 * Displays a user's channel with their videos and management options
 * Allows channel owners to edit and delete their videos
 */
const Channel = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Channel and video state
  const [activeChannel, setActiveChannel] = useState(null);
  const [channelVideos, setChannelVideos] = useState([]);
  const [activeTab, setActiveTab] = useState("videos");
  const [showModal, setShowModal] = useState(false);

  // Video editing state
  const [editingVideo, setEditingVideo] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
  });

  useEffect(() => {
    const loadChannel = async () => {
      try {
        if (id && id !== 'undefined' && id !== 'null' && id !== 'me') {
          // Fetch specific channel by ID (only if ID is valid)
          const res = await api.get(`/channels/${id}`);
          setActiveChannel(res.data);
          setChannelVideos(res.data.videos || []);
        } else {
          // No ID or invalid ID provided, load user's own channel
          const res = await api.get("/channels/me");
          const userChannels = res.data;
          if (userChannels && userChannels.length > 0) {
            setActiveChannel(userChannels[0]);
            setChannelVideos(userChannels[0].videos || []);
          }
        }
      } catch (error) {
        console.error("Error loading channel:", error);
        // If specific channel fails, try loading user's channel as fallback
        if (id) {
          try {
            const res = await api.get("/channels/me");
            const userChannels = res.data;
            if (userChannels && userChannels.length > 0) {
              setActiveChannel(userChannels[0]);
              setChannelVideos(userChannels[0].videos || []);
            }
          } catch (fallbackError) {
            console.error("Fallback channel load failed:", fallbackError);
          }
        }
      }
    };

    loadChannel();
  }, [id]);

  /**
   * Handle editing a video - opens edit modal with current video data
   * @param {Object} video - Video object to edit
   */
  const handleEditVideo = (video) => {
    setEditingVideo(video);
    setEditForm({
      title: video.title,
      description: video.description,
      category: video.category,
      tags: video.tags.join(", "),
    });
  };

  /**
   * Handle deleting a video with confirmation
   * @param {string} videoId - ID of video to delete
   */
  const handleDeleteVideo = async (videoId) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        await api.delete(`/videos/${videoId}`);
        setChannelVideos(channelVideos.filter(v => v._id !== videoId));
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete video");
      }
    }
  };

  /**
   * Handle updating video details
   * @param {Event} e - Form submit event
   */
  const handleUpdateVideo = async (e) => {
    e.preventDefault();
    try {
      const updatedVideo = {
        ...editForm,
        tags: editForm.tags.split(",").map(tag => tag.trim()),
      };
      await api.put(`/videos/${editingVideo._id}`, updatedVideo);
      setChannelVideos(channelVideos.map(v => 
        v._id === editingVideo._id ? { ...v, ...updatedVideo } : v
      ));
      setEditingVideo(null);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update video");
    }
  };

  return (
    <>
      <div className="">
        <Sidebar />

        <div className="channel-page">
          {!activeChannel ? (
            <div className="no-channel">
              <h2>You don't have a channel yet</h2>
              <p>Create a channel to upload videos</p>
              <button onClick={() => setShowModal(true)}>
                Create Channel
              </button>
            </div>
          ) : (
            <>
              {/* Channel Header */}
              <div className="channel-header">
                <div className="channel-info">
                  <h1 className="channel-name">{activeChannel.channelName || activeChannel.owner?.username || "Unknown Channel"}</h1>
                  <p className="channel-stats">
                    {activeChannel.subscribers?.length || 0} subscribers
                  </p>
                </div>
              </div>

              {/* Channel Tabs */}
              <div className="channel-tabs">
                <button
                  className={`tab-button ${activeTab === "videos" ? "active" : ""}`}
                  onClick={() => setActiveTab("videos")}
                >
                  Videos
                </button>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {activeTab === "videos" && (
                  <div className="videos-section">
                    {channelVideos.length > 0 ? (
                      <div className="video-grid">
                        {channelVideos.map((video) => (
                          <div key={video._id} className="channel-video-card">
                            <img
                              src={video.thumbnailUrl || "/placeholder.png"}
                              alt={video.title}
                              className="channel-video-thumbnail"
                              onClick={() => navigate(`/video/${video._id}`)}
                            />
                            <div className="channel-video-info">
                              <h4>{video.title}</h4>
                              <p>{video.views || 0} views • {new Date(video.createdAt).toLocaleDateString()}</p>
                              <div className="video-actions">
                                <button onClick={() => handleEditVideo(video)}>Edit</button>
                                <button onClick={() => handleDeleteVideo(video._id)}>Delete</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-videos">
                        <p>No videos uploaded yet</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Edit Video Modal */}
      {editingVideo && (
        <div className="modal-overlay" onClick={() => setEditingVideo(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Video</h3>
            <form onSubmit={handleUpdateVideo}>
              <input
                type="text"
                placeholder="Title"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              />
              <input
                type="text"
                placeholder="Category"
                value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={editForm.tags}
                onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
              />
              <div className="modal-actions">
                <button type="submit">Update</button>
                <button type="button" onClick={() => setEditingVideo(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <CreateChannelModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreated={(channel) => {
          setActiveChannel(channel);
          setChannelVideos([]);
        }}
      />
    </>
  );
};

export default Channel;
