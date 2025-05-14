import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import logo from "../assets/day1-logo.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    // TODO: Replace with secure API call
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in user:", user);
        alert("Login successful!");

        // Optional: Reset form
        setEmail("");
        setPassword("");

        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Login failed:" + error.message);
      });
  };

  return (
    <div className="login-container">
      <div className="login-stack">
        <img src={logo} alt="Day 1 Logo" className="login-logo" />
        <div className="login-box">
          <p>Login to your account</p>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
