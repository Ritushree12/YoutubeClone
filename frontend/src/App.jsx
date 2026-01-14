import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VideoPlayer from "./pages/VideoPlayer";
import Upload from "./pages/Upload";
import ChannelPage from "./pages/Channel";

/**
 * Main App Component
 * Sets up routing and global layout with header and sidebar
 */
function App() {
  // Sidebar toggle state for mobile responsiveness
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /**
   * Toggle sidebar visibility (used in mobile view)
   */
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <BrowserRouter>
      <div className="app">
        {/* Global header with navigation and search */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Collapsible sidebar for navigation */}
        <Sidebar isOpen={sidebarOpen} />

        {/* Main content area with page routes */}
        <main className="main-content">
          <Routes>
            {/* Home page with video feed */}
            <Route path="/" element={<Home />} />

            {/* Authentication routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Video-related routes */}
            <Route path="/video/:id" element={<VideoPlayer />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/channel/:id" element={<ChannelPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
