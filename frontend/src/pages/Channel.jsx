import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import VideoCard from "../components/VideoCard";

const Channel = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { userId } = useParams();
const [channel,setChannel] = useState({});
const [videos,setVideos] = useState([]);

useEffect(()=>{
  axios.get(`/api/channel/${userId}`).then(r=>setChannel(r.data));
  axios.get(`/api/channel/videos/${userId}`).then(r=>setVideos(r.data));
},[]);


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
<Header/>
<div className="layout">
<Sidebar/>
<div className="channel">
  <h1>{channel.channelName}</h1>
  <p>{channel.handle}</p>

  <div className="video-grid">
    {videos.map(v=>(
      <VideoCard
        key={v._id}
        video={v}
        channelName={channel.channelName}
      />
    ))}
  </div>
</div>
</div>


export default Channel;
