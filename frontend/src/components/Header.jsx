import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import hamburgerIcon from "../assets/hamburger.png";
import searchIcon from "../assets/search.png";

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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
      <div className="header-left">
        <img
          src={hamburgerIcon}
          alt="Menu"
          className="hamburger"
          onClick={toggleSidebar}
        />
        <Link
          to="/"
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "var(--accent-color)",
          }}
        >
          YouTube Clone
        </Link>
      </div>
      <div className="header-center">
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <img src={searchIcon} alt="Search" />
          </button>
        </form>
      </div>
      <div className="header-right">
        {user ? (
          <>
            <Link to="/upload">Upload</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
