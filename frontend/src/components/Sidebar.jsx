import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/">
              <span className="icon">🏠</span>
              Home
            </Link>
          </li>
          <li>
            <Link to="/trending">
              <span className="icon">🔥</span>
              Trending
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="/subscriptions">
                  <span className="icon">📺</span>
                  Subscriptions
                </Link>
              </li>
              <li>
                <Link to="/upload">
                  <span className="icon">⬆️</span>
                  Upload
                </Link>
              </li>
            </>
          )}
          <li>
            <Link to="/library">
              <span className="icon">📚</span>
              Library
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
