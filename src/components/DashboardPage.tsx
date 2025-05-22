// DashBoardPage.tsx
// This is the layout for user home page
// It include a date selector, calorie and protein ring and a meal list


import React, { useState } from "react";
import "./DashboardPage.css";

const DashboardPage: React.FC = () => {
    // View mode toggle between 'calories' and 'protein'
    const [viewMode, setViewMode] = useState<"calories" | "protein">("calories");

    // TimeFrame is either day or week (not used yet but set up for future use)
    const [timeFrame, setTimeFrame] = useState<"day" | "week">("day");

    // Example progress values for calories and protein
    const todayCalories = 1500;
    const caloriesGoal = 2000;

    // Example  meal date to display
    const meals = [
    { name: "Meal 1: Breakfast Burrito", cal: 318, pro: 31, fat: 35 },
    { name: "Protein shake 1: Vanilla Latte", cal: 210, pro: 32, fat: 15 },
    { name: "Snack 1: String Cheese", cal: 8, pro: 7, fat: 5 },
    { name: "Snack 2: String Cheese", cal: 8, pro: 7, fat: 5 },
  ];

  return (
    <div className="dashboard-container">

        <div className="dashboard-days-scroll">
            {[...Array(30)].map((_, i) => {
                const day = new Date();
                day.setDate(day.getDate() - 5 + i);
                const dayLetter = day.toLocaleDateString("en-US", { weekday: "short" }).charAt(0);
                const dateNum = day.getDate();

                return (
                    <div key={i} className="day-pill">
                        <div className="day-letter">{dayLetter}</div>
                        <div className="day-date">{dateNum}</div>
                    </div>
                )
            })}
        </div>
        {/* 2. Toggle button to switch between calories and protein */}
        <div className={`toggle-switch ${viewMode === "protein" ? "active" : ""}`} onClick={() => setViewMode(viewMode === "calories" ? "protein" : "calories")}>
            <div className="slider" />
        </div>

        {/* 3. Progress circle showing how much is consumed*/}
        <div className="dashboard-ring-wrapper">
            {/* Outer Wrapper for positioning */}
            <div className="ring-wrapper">
                {/* SVG progress ring */}
                <svg className="progress-ring" width="200" height="200">
                    <circle
                        className="ring-bg"
                        cx="100"
                        cy="100"
                        r="90"
                        stroke="lightgray"
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
                        strokeDashoffset={(1 - todayCalories / caloriesGoal) * 565.48}
                        />
                </svg>

                {/* Text content insdie the ring */}
                <div className="ring-center-text">
                    <div className="ring-label">{viewMode === "calories" ? "Cal" : "Protein"}</div>
                    <div className="ring-value">{todayCalories}</div>
                    <div className="ring-sub">Daily: {caloriesGoal} {viewMode === "calories" ? "cal" : "g"}</div>
                </div>

                {/* right label with line */}
                <div className="ring-right-label">
                    <span className="label-line"></span>
                    Left {caloriesGoal - todayCalories} {viewMode === "calories" ? "cal" : "g"}
                </div>
            </div>
        </div>

        {/* 4. Toggle between day and week */}
        <div className="dashboard-switch">
            <button onClick={() => setTimeFrame("day")} className={timeFrame === "day" ? "active" : ""}>D</button>
            <button onClick={() => setTimeFrame("week")} className={timeFrame === "week" ? "active" : ""}>W</button>
        </div>

        {/* 5. Daily Meals List: loops through meals and displays info  */}
        <div className="dashboard-meals">
            <h3>Daily Meal:</h3>
            {meals.map((meal, index) => (
                <div className="meal-card" key={index}>
                    <div className="meal-name">{meal.name}</div>
                    <div className="meal-info">
                        <div>Calories: {meal.cal}</div>
                        <div>Protein: {meal.pro}g</div>
                        <div>Fat: {meal.fat}g</div>
                    </div>
                    <div className="meal-edit">&#9776;</div> {/* Edit icon */}
                </div>
            ))}
        </div>
    </div>
  );
};

export default DashboardPage;