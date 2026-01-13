import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import homeIcon from "../assets/home.png";
import trendingIcon from "../assets/trending.png";
import subscribeIcon from "../assets/subscribe.png";
import uploadIcon from "../assets/upload _video.png";
import libraryIcon from "../assets/playlist.png";

const Sidebar = ({ isOpen }) => {
  const { user } = useContext(AuthContext);

  // Toggle a class on <body> so sibling content (filters, main, etc.) can react and not be overlapped.
  useEffect(() => {
    const className = "sidebar-open";
    const root = document.body;
    if (isOpen) root.classList.add(className);
    else root.classList.remove(className);
    return () => root.classList.remove(className);
  }, [isOpen]);

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`} aria-expanded={isOpen}>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img src={homeIcon} alt="Home" className="icon" />
              Home
            </Link>
          </li>
          <li>
            <Link to="/trending">
              <img src={trendingIcon} alt="Trending" className="icon" />
              Trending
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="/subscriptions">
                  <img
                    src={subscribeIcon}
                    alt="Subscriptions"
                    className="icon"
                  />
                  Subscriptions
                </Link>
              </li>
              <li>
                <Link to="/upload">
                  <img src={uploadIcon} alt="Upload" className="icon" />
                  Upload
                </Link>
              </li>
            </>
          )}
          <li>
            <Link to="/library">
              <img src={libraryIcon} alt="Library" className="icon" />
              Library
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
