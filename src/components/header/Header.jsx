// --- Header.jsx ---
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../features/searchSlice";
import { setFilters, getGames } from "../../features/gameSlice";
import { useUser, SignInButton, SignOutButton } from "@clerk/clerk-react";
import { FaUserCircle, FaBookmark, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.games.filters);
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setInputValue(value);
    dispatch(setSearchQuery(value));
    dispatch(setFilters({ search: value }));
    dispatch(getGames());
  };

  return (
    <header className="header">
      <Link to="/" className="logo">🎮 GameHub</Link>
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search games..."
          value={inputValue}
          onChange={handleSearch}
        />
      </div>
      <div className="nav-icons">
        <Link to="/library" className="icon-btn" title="Library">
          <FaBookmark size={20} />
        </Link>
        <div className="auth-section">
          {user ? (
            <>
              
<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
  <FaUserCircle size={30} />
  <SignOutButton>
    <button
      style={{
        padding: "6px 12px",
        backgroundColor: "#ff4d4f",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
      }}
    >
      Logout
    </button>
  </SignOutButton>
</div>
            </>
          ) : (
            <SignInButton mode="modal" afterSignInUrl="/">
              <button className="login-btn">Login</button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;