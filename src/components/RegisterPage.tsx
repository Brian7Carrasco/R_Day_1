import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "./LoginPage.css";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User registerd:", userCredential.user);
        alert("Registration successful! You can now log in.");
      })
      .catch((error) => {
        console.error("Registration error:", error);
        alert("Error:" + error.message);
      });

    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <div className="login-stack">
        <div className="login-box">
          <h2>Create an Account</h2>
          <form onSubmit={handleRegister}>
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
              Register
            </button>
            <p className="login-footer">
              Already have an account? <a href="/">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
