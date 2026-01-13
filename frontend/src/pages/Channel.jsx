import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";

const Channel = () => {
  const { id } = useParams();   // channelId
  const { user } = useContext(AuthContext);

  const [channel, setChannel] = useState(null);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    axios.get(`/api/channel/${id}`).then((res) => {
      setChannel(res.data);

      if (user) {
        const isSub = res.data.subscribers?.includes(user._id);
        setSubscribed(isSub);
      }
    });
  }, [id, user]);

  const handleSubscribe = async () => {
    const res = await axios.post(`/api/channel/${id}/subscribe`);
    setSubscribed(!subscribed);

    setChannel((prev) => ({
      ...prev,
      subscribers: subscribed
        ? prev.subscribers.filter((s) => s !== user._id)
        : [...prev.subscribers, user._id],
    }));
  };

  if (!channel) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <div className="layout">
        <Sidebar />

        <div className="channel-page">
          {/* Channel Header */}
          <div className="channel-header">
            <h1>{channel.channelName}</h1>
            <p>{channel.handle}</p>
            <p>{channel.subscribers.length} subscribers</p>

            {user && user._id !== channel.owner && (
              <button className="subscribe-btn" onClick={handleSubscribe}>
                {subscribed ? "Subscribed" : "Subscribe"}
              </button>
            )}
          </div>

          {/* Videos */}
          <div className="video-grid">
            {channel.videos.map((video) => (
              <VideoCard
                key={video._id}
                video={video}
                channelName={channel.channelName}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Channel;
