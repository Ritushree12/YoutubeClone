import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import hamburgerIcon from "../assets/hamburger.png";

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext);

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
