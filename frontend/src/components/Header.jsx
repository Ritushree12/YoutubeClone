import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import hamburgerIcon from "../assets/hamburger.png";
import searchIcon from "../assets/search.png";
import userIcon from "../assets/user.png";
import logoImage from "../assets/logo.png";
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
          <img src={logoImage} alt="logo" width="80px" height="30px" className="logo-image" />
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
      <div className="header-right" style={{ position: "relative" }}>
        {user ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to="/upload" style={{ marginRight: "15px" }}>
              Upload
            </Link>

            <img
              src={userIcon}
              alt="User"
              onClick={() => setShowMenu(!showMenu)}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                cursor: "pointer",
                objectFit: "cover",
                border: "2px solid #ff0000",
              }}
            />

            {showMenu && (
              <div className="user-menu">
     {channel ? (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <button
      className="menu-btn"
      onClick={() => {
        navigate(`/channel/${channel._id}`);
        setShowMenu(false);
      }}
    >
      View Your Channel
    </button>
  </div>
) : (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <button
      className="menu-btn"
      onClick={() => {
        setShowModal(true);
        setShowMenu(false);
      }}
    >
      Create Channel
    </button>
  </div>
)}


                <button
                  className="menu-btn logout-btn"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>

      {/* CREATE CHANNEL MODAL */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "320px",
            }}
          >
            <h3>Create Channel</h3>

            <input
              placeholder="Channel Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            />

            <textarea
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            />

            <button
              style={{
                width: "100%",
                padding: "10px",
                background: "#ff0000",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
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
