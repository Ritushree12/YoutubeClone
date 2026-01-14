import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";
import CreateChannelModal from "../components/CreateChannelModal";

const Channel = () => {
  const [channels, setChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api.get("/channel/me").then((res) => {
      setChannels(res.data);
      setActiveChannel(res.data[0] || null);
    });
  }, []);

  return (
    <>
      <div className="layout">
        <Sidebar />

        <div className="channel-page">
          {/* NO CHANNEL */}
          {!activeChannel && (
            <div className="no-channel">
              <h2>You don’t have a channel yet</h2>
              <p>Create a channel to upload videos</p>
              <button onClick={() => setShowModal(true)}>
                Create Channel
              </button>
            </div>
          )}

          {/* CHANNEL EXISTS */}
          {activeChannel && (
            <>
              <div className="channel-header">
                <h1>{activeChannel.channelName}</h1>
                <p>{activeChannel.subscribers?.length || 0} subscribers</p>
              </div>

              <div className="video-grid">
                {(activeChannel.videos || []).map((video) => (
                  <VideoCard key={video._id} video={video} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <CreateChannelModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreated={(channel) => {
          setChannels([...channels, channel]);
          setActiveChannel(channel);
        }}
      />
    </>
  );
};

export default Channel;
