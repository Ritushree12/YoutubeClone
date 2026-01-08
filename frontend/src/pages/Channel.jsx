import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import VideoCard from "../components/VideoCard";

const Channel = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    api.get(`/channels/${id}`).then((res) => setChannel(res.data));
  }, [id]);

  return channel ? (
    <div>
      <h2>{channel.channelName}</h2>
      <p>{channel.description}</p>
      <div className="video-grid">
        {channel.videos.map((v) => (
          <VideoCard key={v._id} video={v} />
        ))}
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Channel;
