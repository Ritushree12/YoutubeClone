import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div>
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
      <nav>
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
      </nav>
    </header>
  );
};

export default Header;
