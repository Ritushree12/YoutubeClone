import { createContext, useState } from "react";

/**
 * Authentication Context
 * Provides user authentication state and methods throughout the app
 */
export const AuthContext = createContext();

/**
 * AuthProvider Component
 * Wraps the app to provide authentication context
 * @param {Object} props - React props
 * @param {React.ReactNode} props.children - Child components
 */
export const AuthProvider = ({ children }) => {
  // Initialize user state from localStorage
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  /**
   * Login function - stores user data and token
   * @param {Object} data - User data from login response
   */
  const login = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  /**
   * Logout function - clears user data
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
