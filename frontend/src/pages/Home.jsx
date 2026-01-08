import { useEffect, useState } from "react";
import api from "../services/api";
import VideoCard from "../components/VideoCard";
import Filters from "../components/Filters";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    api
      .get(
        `/videos?search=${search}&category=${
          category === "All" ? "" : category
        }`
      )
      .then((res) => setVideos(res.data))
      .catch((err) => console.error(err));
  }, [search, category]);

  return (
    <div className="container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search videos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filters">
        <Filters setCategory={setCategory} />
      </div>

      <div className="video-grid">
        {videos.map((v) => (
          <VideoCard key={v._id} video={v} />
        ))}
      </div>
    </div>
  );
};

export default Home;
