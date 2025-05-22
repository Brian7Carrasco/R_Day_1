import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import DashboardPage from "./components/DashboardPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}
export default App;
// This code is a simple React application that imports a LoginPage component and renders it within the main App component. The LoginPage component contains a form for user login, including fields for username and password, and links for registration and password reset. The application is styled using an external CSS file (App.css) to ensure a clean and user-friendly interface.
