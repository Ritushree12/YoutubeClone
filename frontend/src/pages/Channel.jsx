import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";
import CreateChannelModal from "../components/CreateChannelModal";

const Channel = () => {
  const { id } = useParams();
  const [activeChannel, setActiveChannel] = useState(null);
  const [channelVideos, setChannelVideos] = useState([]);
  const [activeTab, setActiveTab] = useState("videos");
  const [showModal, setShowModal] = useState(false);

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
                          <VideoCard key={video._id} video={video} />
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
