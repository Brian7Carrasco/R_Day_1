// DashBoardPage.tsx
// This is the layout for user home page
// It includes a date selector, calorie and protein ring, and a meal list

import React, { useState } from "react";
import "./DashboardPage.css";

const DashboardPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<"calories" | "protein">("calories");
  const [timeFrame, setTimeFrame] = useState<"day" | "week">("day");

  const todayCalories = 1500;
  const caloriesGoal = 2000;
  const todayProtein = 150;
  const proteinGoal = 200;

  const meals = [
    { name: "Meal 1: Breakfast Burrito", cal: 318, pro: 31, fat: 35 },
    { name: "Protein shake 1: Vanilla Latte", cal: 210, pro: 32, fat: 15 },
    { name: "Snack 1: String Cheese", cal: 8, pro: 7, fat: 5 },
    { name: "Snack 2: String Cheese", cal: 8, pro: 7, fat: 5 },
  ];

  return (
    <div
      className={`dashboard-container ${
        viewMode === "protein" ? "protein-mode" : "calories-mode"
      }`}
    >
      {/* Day selector */}
      <div className="dashboard-days-scroll">
        {[...Array(30)].map((_, i) => {
          const day = new Date();
          day.setDate(day.getDate() - 5 + i);
          const dayLetter = day
            .toLocaleDateString("en-US", { weekday: "short" })
            .charAt(0);
          const dateNum = day.getDate();

          return (
            <div key={i} className="day-pill">
              <div className="day-letter">{dayLetter}</div>
              <div className="day-date">{dateNum}</div>
            </div>
          );
        })}
      </div>

      {/* Toggle Switch */}
      <div
        className={`toggle-switch ${viewMode === "protein" ? "active" : ""}`}
        onClick={() =>
          setViewMode(viewMode === "calories" ? "protein" : "calories")
        }
      >
        <div className="slider" />
      </div>

      {/* Flip Card for Ring Section */}
      <div
        className={`dashboard-flip-card ${
          viewMode === "protein" ? "flipped" : ""
        }`}
      >
        <div className="dashboard-flip-inner">
          {/* Front - Calories */}
          <div className="dashboard-flip-front">
            <div className="dashboard-ring-wrapper">
              <div className="ring-wrapper">
                <svg className="progress-ring" width="200" height="200">
                  <circle
                    className="ring-bg"
                    cx="100"
                    cy="100"
                    r="90"
                    stroke="#eee"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    className="ring-fg"
                    cx="100"
                    cy="100"
                    r="90"
                    stroke="teal"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray="565.48"
                    strokeDashoffset={
                      (1 - todayCalories / caloriesGoal) * 565.48
                    }
                  />
                </svg>
                <div className="ring-center-text">
                  <div className="ring-label">Cal</div>
                  <div className="ring-value">{todayCalories}</div>
                  <div className="ring-sub">Daily: {caloriesGoal} cal</div>
                </div>
                <div className="ring-right-label">
                  <span className="label-line"></span>
                  Left {caloriesGoal - todayCalories} cal
                </div>
              </div>
            </div>
          </div>

          {/* Back - Protein */}
          <div className="dashboard-flip-back">
            <div className="dashboard-ring-wrapper">
              <div className="ring-wrapper">
                <svg className="progress-ring" width="200" height="200">
                  <circle
                    className="ring-bg"
                    cx="100"
                    cy="100"
                    r="90"
                    stroke="#eee"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    className="ring-fg"
                    cx="100"
                    cy="100"
                    r="90"
                    stroke="teal"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray="565.48"
                    strokeDashoffset={(1 - todayProtein / proteinGoal) * 565.48}
                  />
                </svg>
                <div className="ring-center-text">
                  <div className="ring-label">Pro</div>
                  <div className="ring-value">{todayProtein}</div>
                  <div className="ring-sub">Daily: {proteinGoal} pro</div>
                </div>
                <div className="ring-right-label">
                  <span className="label-line"></span>
                  Left {proteinGoal - todayProtein} pro
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* D/W Switch */}
      <div className="dashboard-switch">
        <button
          onClick={() => setTimeFrame("day")}
          className={timeFrame === "day" ? "active" : ""}
        >
          D
        </button>
        <button
          onClick={() => setTimeFrame("week")}
          className={timeFrame === "week" ? "active" : ""}
        >
          W
        </button>
      </div>

      {/* Meals List */}
      <div className="dashboard-meals">
        <h3>Daily Meal:</h3>
        {meals.map((meal, index) => (
          <div className="meal-card" key={index}>
            <div className="meal-header">
              <div className="meal-name">{meal.name}</div>
              <div className="meal-edit">&#9776;</div>
            </div>
            <div className="meal-info">
              <div>Calories: {meal.cal}</div>
              <div>Protein: {meal.pro}g</div>
              <div>Fat: {meal.fat}g</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
