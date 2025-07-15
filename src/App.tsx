import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DashboardPage from "./components/DashboardPage";
import CalendarPage from "./components/CalendarPage";
import WorkoutPage from "./components/WorkoutPage";
import GoalsPage from "./components/GoalsPage";
import SettingsPage from "./components/SettingsPage";
import BottomNavBar from "./components/BottomNavBar";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/workout" element={<WorkoutPage />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<DashboardPage />} />
        </Routes>

        <BottomNavBar />
      </div>
    </Router>
  );
}

export default App;
