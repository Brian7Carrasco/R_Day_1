import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css"; // You can keep using this or split styles later

const RegisterPage: React.FC = () => {
  // Define state for all input fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("");
  const [timeline, setTimeline] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate(); // Used to redirect the user after registration

  // When the form is submitted
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    // Check if required fields are filled
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Create the user with Firebase Auth
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User registered:", user);
        alert("User registered successfully!");

        // Clear all form fields after success
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setCity("");
        setState("");
        setZip("");
        setCountry("");
        setAge("");
        setWeight("");
        setHeight("");
        setGoal("");
        setTimeline("");
        setCalories("");
        setProtein("");
        setPassword("");
        setConfirmPassword("");

        // Redirect to dashboard
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Registration error:", error);
        alert("Error: " + error.message);
      });
  };

  return (
    <div className="login-container">
      <div className="login-stack">
        <div className="login-box">
          <h2>Create an Account</h2>
          <form onSubmit={handleRegister}>
            {/* Personal Information */}
            <input type="text" placeholder="First Name" className="register-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" placeholder="Last Name" className="register-input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input type="email" placeholder="Email" className="register-input" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Phone" className="register-input" value={phone} onChange={(e) => setPhone(e.target.value)} />

            {/* Address Information */}
            <input type="text" placeholder="Address" className="register-input" value={address} onChange={(e) => setAddress(e.target.value)} />
            <input type="text" placeholder="City" className="register-input" value={city} onChange={(e) => setCity(e.target.value)} />
            <input type="text" placeholder="State" className="register-input" value={state} onChange={(e) => setState(e.target.value)} />
            <input type="text" placeholder="Zip Code" className="register-input" value={zip} onChange={(e) => setZip(e.target.value)} />
            <input type="text" placeholder="Country" className="register-input" value={country} onChange={(e) => setCountry(e.target.value)} />

            {/* Health Goals */}
            <input type="number" placeholder="Age" className="register-input" value={age} onChange={(e) => setAge(e.target.value)} />
            <input type="number" placeholder="Weight (lbs)" className="register-input" value={weight} onChange={(e) => setWeight(e.target.value)} />
            <input type="number" placeholder="Height (inches)" className="register-input" value={height} onChange={(e) => setHeight(e.target.value)} />
            <input type="text" placeholder="Goal" className="register-input" value={goal} onChange={(e) => setGoal(e.target.value)} />
            <input type="text" placeholder="Timeline" className="register-input" value={timeline} onChange={(e) => setTimeline(e.target.value)} />
            <input type="number" placeholder="Calories (optional)" className="register-input" value={calories} onChange={(e) => setCalories(e.target.value)} />
            <input type="number" placeholder="Protein (optional)" className="register-input" value={protein} onChange={(e) => setProtein(e.target.value)} />

            {/* Account Info */}
            <input type="password" placeholder="Password" className="register-input" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password" className="register-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

            <button type="submit" className="register-button">Register</button>

            {/* Navigation for existing users */}
            <p className="login-footer">
              Already have an account? <Link to="/">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
