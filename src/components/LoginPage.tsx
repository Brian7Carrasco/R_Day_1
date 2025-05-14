// Import React and useState to manage form data like email and password
import React, { useState } from "react";

// Import tools for page navigation and linking
import { Link, useNavigate } from "react-router-dom";

// Import the CSS for styling
import "./LoginPage.css";

// Import the logo image
import logo from "../assets/day1-logo.png";

// Import Firebase tools for signing in and handling "remember me" session behavior
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from "firebase/auth";

// Import your Firebase config where `auth` is already set up
import { auth } from "../firebaseConfig";

// Define the LoginPage component using TypeScript and React Functional Component syntax
const LoginPage: React.FC = () => {

  // State to hold the email input value
  const [email, setEmail] = useState("");

  // State to hold the password input value
  const [password, setPassword] = useState("");

  // Navigation hook from React Router to redirect users
  const navigate = useNavigate();

  // State to track whether "Remember Me" is checked
  const [rememberMe, setRememberMe] = useState(false);

  // Function that runs when the login form is submitted
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();  // Stop the page from refreshing when you hit "Submit"

    // If email or password is empty, show a warning and stop here
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    // Choose how long the user stays logged in
    const persistenceType = rememberMe
      ? browserLocalPersistence  // stays logged in even after closing browser
      : browserSessionPersistence;  // logs out when browser is closed

    // Set that login session type
    setPersistence(auth, persistenceType)
      .then(() => {
        // Try to sign in with Firebase using email and password
        return signInWithEmailAndPassword(auth, email, password);
      })
      .then((userCredential) => {
        // If successful, Firebase gives you user data back
        const user = userCredential.user;
        console.log("User logged in:", user);  // Log for developers
        alert(`Welcome back, ${user.email}!`);  // Say hi to the user

        // Clear the form
        setEmail("");
        setPassword("");

        // Redirect to dashboard after login
        navigate("/dashboard");
      })
      .catch((error) => {
        // If there's an error logging in (wrong password, etc.), show it
        console.error("Login error:", error);
        alert("Login failed:" + error.message);
      });
  };

  // This is what shows up on the page
  return (
    <div className="login-container">
      <div className="login-stack">
        {/* Show the logo at the top */}
        <img src={logo} alt="Day 1 Logo" className="login-logo" />

        {/* The login box with inputs */}
        <div className="login-box">
          <p>Login to your account</p>
          
          {/* Form that runs handleLogin when submitted */}
          <form onSubmit={handleLogin}>
            
            {/* Email input box */}
            <input
              type="email"
              placeholder="Email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  // Update email state when user types
            />

            {/* Password input box */}
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  // Update password state
            />

            {/* "Remember me" checkbox */}
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}  // Update rememberMe state
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>

            {/* Button to log in */}
            <button type="submit" className="login-button">
              Login
            </button>

            {/* Links to register and reset password */}
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

// Export the component so you can use it in other files
export default LoginPage;
