import { useEffect, useState } from "react";
import api from "../services/api";
import VideoCard from "../components/VideoCard";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    api.get("/videos").then((res) => setVideos(res.data));
  }, []);

  return (
    <div>
      {videos.map((v) => (
        <VideoCard key={v._id} video={v} />
      ))}
    </div>
  );
};

export default Home;
