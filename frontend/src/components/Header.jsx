import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import hamburgerIcon from "../assets/hamburger.png";
import searchIcon from "../assets/search.png";
import userIcon from "../assets/user.png";

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [channel, setChannel] = useState(null);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  // Fetch user's channel
  useEffect(() => {
    if (user) {
      axios
        .get(`/api/channel/${user._id}`)
        .then((res) => setChannel(res.data))
        .catch(() => setChannel(null));
    }
  }, [user]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/");
    }
  };

  return (
    <header className="header">
      {/* LEFT */}
      <div className="header-left">
        <img
          src={hamburgerIcon}
          className="hamburger"
          alt="menu"
          onClick={toggleSidebar}
        />
        <Link to="/" className="logo">
          RituSnaps
        </Link>
      </div>

      {/* CENTER */}
      <div className="header-center">
        <form onSubmit={handleSearch} className="search-bar">
          <input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <img src={searchIcon} alt="search" />
          </button>
        </form>
      </div>

      {/* RIGHT */}
      <div className="header-right">
        {user ? (
          <>
            <Link to="/upload">Upload</Link>

            <img
              src={userIcon}
              className="avatar"
              alt="user"
              onClick={() => setShowMenu(!showMenu)}
            />

            {showMenu && (
              <div className="dropdown">
                {channel ? (
                  <button onClick={() => navigate(`/channel/${channel._id}`)}>
                    View Your Channel
                  </button>
                ) : (
                  <button onClick={() => setShowModal(true)}>
                    Create Channel
                  </button>
                )}

                <button onClick={logout}>Logout</button>
              </div>
            )}
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>

      {/* CREATE CHANNEL MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Create Channel</h3>

            <input
              placeholder="Channel Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <button
              onClick={async () => {
                const res = await axios.post("/api/channel/create", {
                  userId: user._id,
                  channelName: name,
                  description: desc,
                });

                setChannel(res.data);
                setShowModal(false);
                setName("");
                setDesc("");
              }}
            >
              Create Channel
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
