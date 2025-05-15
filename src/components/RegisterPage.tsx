// Import React and useState so we can make interactive components
import React, { useState } from "react";

// Import a hook that helps with Google Maps address autocomplete
import usePlacesAutocomplete from "use-places-autocomplete";

// Import Firebase function to create a new user account
import { createUserWithEmailAndPassword } from "firebase/auth";

// Import your Firebase setup with the auth object
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";


// Import navigation and Link so we can send users to different pages
import { useNavigate, Link } from "react-router-dom";

// Import styles for this page
import "./RegisterPage.css";


// Start the RegisterPage component
const RegisterPage: React.FC = () => {
  const [step, setStep] = useState(1);  // Controls which form step (slide) we're on
  const navigate = useNavigate();       // Used to redirect the user to another page

  // Store all the user's form answers in one object
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    age: "",
    weight: "",
    height: "",
    goal: "",
    timeline: "",
    calories: "",
    protein: "",
  });

  // Set up Google Autocomplete for the address field
  const {
    ready,             // tells us if autocomplete is ready to use
    value,             // the current value typed in
    suggestions: { status, data },  // suggestions from Google
    setValue,          // updates the input value
    clearSuggestions,  // removes the suggestions list
  } = usePlacesAutocomplete();

  // This function updates a specific field in the formData object
  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // When the user hits the final "Register" button
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();  // Prevent page from refreshing

    const { email, password, confirmPassword } = formData;

    // Make sure required fields are filled in
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Try to register the user with Firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User registered:", userCredential.user);  // Log info for devs
        alert("User registered successfully!");                 // Let user know
        navigate("/dashboard");                                // Send to dashboard
      })
      .catch((error) => {
        console.error("Registration error:", error);           // Log error
        alert("Error: " + error.message);                      // Show user the error
      });
  };

  // What the page looks like (JSX)
  return (
    <div className="RegisterPage-container">
      <div className="RegisterPage-stack">
        <div className="RegisterPage-box">
          <h2>Create an Account</h2>
          <form onSubmit={handleRegister}>
            
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="RegisterPage-step">
                <input type="text" placeholder="First Name" value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)} />
                
                <input type="text" placeholder="Last Name" value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)} />
                
                <input type="email" placeholder="Email" value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)} />
                
                <input type="tel" placeholder="Phone Number" value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)} />

                {/* Google autocomplete input for address */}
                <div className="autocomplete-container">
                  <input
                    type="text"
                    placeholder="Address"
                    className="register-input"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}  // disable if autocomplete isn't ready
                  />
                  {/* Show suggestions if Google returns them */}
                  {status === "OK" && (
                    <ul className="autocomplete-list">
                      {data.map(({ place_id, description }) => (
                        <li
                          key={place_id}
                          onClick={() => {
                            updateFormData("address", description);
                            setValue(description, false);
                            clearSuggestions();
                          }}
                        >
                          {description}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <input type="password" placeholder="Password" value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)} />
                
                <input type="password" placeholder="Confirm Password" value={formData.confirmPassword}
                  onChange={(e) => updateFormData("confirmPassword", e.target.value)} />

                <button type="button" onClick={() => setStep(2)} className="RegisterPage-button">
                  Next
                </button>
              </div>
            )}

            {/* Step 2: Health Info */}
            {step === 2 && (
              <div className="RegisterPage-step">
                <input type="number" placeholder="Age" value={formData.age}
                  onChange={(e) => updateFormData("age", e.target.value)} />
                
                <input type="number" placeholder="Weight (lbs)" value={formData.weight}
                  onChange={(e) => updateFormData("weight", e.target.value)} />
                
                <input type="number" placeholder="Height (inches)" value={formData.height}
                  onChange={(e) => updateFormData("height", e.target.value)} />

                {/* Buttons to go back or move forward */}
                <button type="button" onClick={() => setStep(1)} className="RegisterPage-button">
                  Back
                </button>
                <button type="button" onClick={() => setStep(3)} className="RegisterPage-button">
                  Next
                </button>
              </div>
            )}

            {/* Step 3: Goals Info */}
            {step === 3 && (
              <div className="RegisterPage-step">
                <input type="text" placeholder="Fitness Goal" value={formData.goal}
                  onChange={(e) => updateFormData("goal", e.target.value)} />
                
                <input type="number" placeholder="Timeline (weeks)" value={formData.timeline}
                  onChange={(e) => updateFormData("timeline", e.target.value)} />
                
                <input type="number" placeholder="Calories per day (optional)" value={formData.calories}
                  onChange={(e) => updateFormData("calories", e.target.value)} />
                
                <input type="number" placeholder="Protein (g, optional)" value={formData.protein}
                  onChange={(e) => updateFormData("protein", e.target.value)} />

                {/* Buttons for back and register */}
                <button type="button" onClick={() => setStep(2)} className="RegisterPage-button">
                  Back
                </button>
                <button type="submit" className="RegisterPage-button">
                  Register
                </button>
              </div>
            )}
          </form>
            <p className="login-link">
              Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
      </div>
    </div>
  );
};

// Make this component available to use elsewhere
export default RegisterPage;
