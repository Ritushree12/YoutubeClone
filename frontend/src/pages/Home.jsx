import { useEffect, useState } from "react";
import api from "../services/api";
import VideoCard from "../components/VideoCard";
import Filters from "../components/Filters";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    // Fetch videos based on search and category
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
    <div>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search videos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category Filters */}
      <Filters setCategory={setCategory} />

      {/* Video Grid */}
      <div className="video-grid">
        {videos.map((v) => (
          <VideoCard key={v._id} video={v} />
        ))}
      </div>
    </div>
  );
};

export default Home;
