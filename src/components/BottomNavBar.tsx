import React from "react";
import { NavLink } from "react-router-dom";
import { CalendarDays, Dumbbell, Home, Target, User } from "lucide-react";
import "./BottomNavBar.css";

const BottomNavBar: React.FC = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/calendar" className="nav-item">
        <CalendarDays size={24} />
      </NavLink>
      <NavLink to="/workout" className="nav-item">
        <Dumbbell size={24} />
      </NavLink>
      <NavLink to="/dashboard" className="nav-item main-button">
        <Home size={28} />
      </NavLink>
      <NavLink to="/goals" className="nav-item">
        <Target size={24} />
      </NavLink>
      <NavLink to="/settings" className="nav-item">
        <User size={24} />
      </NavLink>
    </nav>
  );
};

export default BottomNavBar;
