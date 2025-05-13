import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import logo from "../assets/day1-logo.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Username and password are required");
      return;
    }

    // TODO: Replace with secure API call
    console.log("Logging in with ", { username, password });

    // Optional: Reset form
    setUsername("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <div className="login-stack">
        <img src={logo} alt="Day 1 Logo" className="login-logo" />
        <div className="login-box">
          <p>Login to your account</p>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-button">
              Login
            </button>
            <p className="login-footer">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
            <p className="login-footer">
              Forgot your password?{" "}
              <Link to="/reset-password">Reset Password</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
