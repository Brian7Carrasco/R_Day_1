import React from "react";
import { NavLink } from "react-router-dom";
import "./BottomNavBar.css";

const BottomNavBar: React.FC = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/calendar" className="nav-item">
        📅
      </NavLink>
      <NavLink to="/workout" className="nav-item">
        🏋️
      </NavLink>
      <NavLink to="/dashboard" className="nav-item main-button">
        🏠
      </NavLink>
      <NavLink to="/goals" className="nav-item">
        🎯
      </NavLink>
      <NavLink to="/settings" className="nav-item">
        👤
      </NavLink>
    </nav>
  );
};

export default BottomNavBar;
