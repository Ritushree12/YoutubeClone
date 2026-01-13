import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import VideoCard from "../components/VideoCard";
import Filters from "../components/Filters";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState("all"); // lowercase for DB match
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(() => {
    api
      .get(
        `/videos?search=${search}&category=${
          category.toLowerCase() === "all" ? "" : category
        }`
      )
      .then((res) => setVideos(res.data))
      .catch((err) => console.error(err));
  }, [search, category]);

  return (
    <div className="container">
      {/* Filters */}
      <div className="filters">
        <Filters setCategory={setCategory} />
      </div>

      {/* Video Grid */}
      <div
        className="video-grid"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
        }}
      >
        {videos.map((v) => (
          <VideoCard key={v._id} video={v} />
        ))}
      </div>
    </div>
  );
};

export default Home;
