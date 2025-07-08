import React, { useState } from "react";
import "./DashboardPage.css";

type Meal = {
  name: string;
  cal: number;
  pro: number;
  fat: number;
};

type MealsByDate = {
  [dateKey: string]: Meal[];
};

const DashboardPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<"calories" | "protein">("calories");
  const [timeFrame, setTimeFrame] = useState<"day" | "week">("day");
  const [centerDay, setCenterDay] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());

  const [mealsByDate, setMealsByDate] = useState<MealsByDate>({});
  const [mealType, setMealType] = useState("Breakfast");
  const [newMealName, setNewMealName] = useState("");
  const [newMealCalories, setNewMealCalories] = useState("");
  const [newMealProtein, setNewMealProtein] = useState("");
  const [newMealFat, setNewMealFat] = useState("");
  const [showAddMealForm, setShowAddMealForm] = useState(false);

  const caloriesGoal = 2000;
  const proteinGoal = 200;

  const getDateKey = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const getVisibleDays = () => {
    const days = [];
    for (let i = -2; i <= 2; i++) {
      const day = new Date(centerDay);
      day.setDate(day.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
    setCenterDay(day);
  };

  const handleScrollLeft = () => {
    const newCenterDay = new Date(centerDay);
    newCenterDay.setDate(newCenterDay.getDate() - 1);
    setCenterDay(newCenterDay);
  };

  const handleScrollRight = () => {
    const newCenterDay = new Date(centerDay);
    newCenterDay.setDate(newCenterDay.getDate() + 1);
    setCenterDay(newCenterDay);
  };

  const handleAddMeal = () => {
    if (!newMealName || !newMealCalories || !newMealProtein || !newMealFat) {
      alert("Please fill in all fields");
      return;
    }

    const newMeal: Meal = {
      name: `${mealType}: ${newMealName}`,
      cal: parseInt(newMealCalories),
      pro: parseInt(newMealProtein),
      fat: parseInt(newMealFat),
    };

    const currentKey = getDateKey(selectedDay);
    const updatedMeals = [...(mealsByDate[currentKey] || []), newMeal];

    setMealsByDate((prev) => ({
      ...prev,
      [currentKey]: updatedMeals,
    }));

    setNewMealName("");
    setNewMealCalories("");
    setNewMealProtein("");
    setNewMealFat("");
    setMealType("Breakfast");
    setShowAddMealForm(false);
  };

  const currentKey = getDateKey(selectedDay);
  const meals = mealsByDate[currentKey] || [];

  const calculateDailyTotals = (meals: Meal[]) => {
    let totalCalories = 0;
    let totalProtein = 0;
    meals.forEach((meal) => {
      totalCalories += meal.cal;
      totalProtein += meal.pro;
    });
    return { totalCalories, totalProtein };
  };

  const { totalCalories, totalProtein } = calculateDailyTotals(meals);

  const ringValue = viewMode === "calories" ? totalCalories : totalProtein;
  const ringGoal = viewMode === "calories" ? caloriesGoal : proteinGoal;
  const ringLabel = viewMode === "calories" ? "Calories" : "Protein";
  const ringSub =
    viewMode === "calories"
      ? `Daily: ${caloriesGoal} cal`
      : `Daily: ${proteinGoal} g`;
  const ringLeft = Math.max(ringGoal - ringValue, 0);
  const ringLeftLabel =
    viewMode === "calories" ? `Left ${ringLeft} cal` : `Left ${ringLeft} g`;
  const ringStroke = viewMode === "calories" ? "#188a8a" : "#276c6f";
  const ringCircumference = 2 * Math.PI * 115;
  const ringProgress = Math.min(ringValue / ringGoal, 1);
  const ringDashoffset = ringCircumference * (1 - ringProgress);

  return (
    <div
      className={`dashboard-container ${
        viewMode === "protein" ? "protein-mode" : ""
      }`}
    >
      {/* Day Selector */}
      <div className="dashboard-days-scroll">
        <button className="scroll-button left" onClick={handleScrollLeft}>
          ←
        </button>
        <div className="days-container">
          {getVisibleDays().map((day, i) => {
            const dayLetter = day
              .toLocaleDateString("en-US", { weekday: "short" })
              .charAt(0);
            const dateNum = day.getDate();
            const isSelected =
              day.toDateString() === selectedDay.toDateString();
            return (
              <div
                key={i}
                className={`day-pill ${isSelected ? "selected" : ""}`}
                onClick={() => handleDayClick(day)}
              >
                <div className="day-letter">{dayLetter}</div>
                <div className="day-date">{dateNum}</div>
              </div>
            );
          })}
        </div>
        <button className="scroll-button right" onClick={handleScrollRight}>
          →
        </button>
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

      {/* Progress Ring */}
      <div className="ring-wrapper">
        <svg className="progress-ring" width="250" height="250">
          <circle
            cx="125"
            cy="125"
            r="115"
            fill="none"
            stroke="#e6e6e6"
            strokeWidth="15"
          />
          <circle
            cx="125"
            cy="125"
            r="115"
            fill="none"
            stroke={ringStroke}
            strokeWidth="15"
            strokeDasharray={ringCircumference}
            strokeDashoffset={ringDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 125 125)"
            style={{
              transition: "stroke-dashoffset 0.6s ease, stroke 0.3s ease",
            }}
          />
        </svg>
        <div className="ring-center-text">
          <div className="ring-label">{ringLabel}</div>
          <div className="ring-value">{ringValue}</div>
          <div className="ring-sub">{ringSub}</div>
        </div>
        <div className="ring-right-label">
          <span className="label-line"></span>
          {ringLeftLabel}
        </div>
      </div>

      {/* Timeframe Toggle */}
      <div className="dashboard-switch">
        <button
          onClick={() => setTimeFrame("day")}
          className={timeFrame === "day" ? "active" : ""}
        >
          Day
        </button>
        <button
          onClick={() => setTimeFrame("week")}
          className={timeFrame === "week" ? "active" : ""}
        >
          Week
        </button>
      </div>

      {/* Meals List */}
      <div className="dashboard-meals">
        <div className="meals-header">
          <h3>Daily Meal:</h3>
          <button
            className="add-meal-button"
            onClick={() => setShowAddMealForm(!showAddMealForm)}
          >
            +
          </button>
        </div>

        {showAddMealForm ? (
          <div className="add-meal-panel">
            <h3>Add a Meal</h3>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="add-meal-input"
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </select>
            <input
              type="text"
              placeholder="Meal Name"
              className="add-meal-input"
              value={newMealName}
              onChange={(e) => setNewMealName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Calories"
              className="add-meal-input"
              value={newMealCalories}
              onChange={(e) => setNewMealCalories(e.target.value)}
            />
            <input
              type="number"
              placeholder="Protein (g)"
              className="add-meal-input"
              value={newMealProtein}
              onChange={(e) => setNewMealProtein(e.target.value)}
            />
            <input
              type="number"
              placeholder="Fat (g)"
              className="add-meal-input"
              value={newMealFat}
              onChange={(e) => setNewMealFat(e.target.value)}
            />
            <div className="add-meal-buttons">
              <button
                type="button"
                onClick={() => setShowAddMealForm(false)}
                className="RegisterPage-button"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddMeal}
                className="RegisterPage-button"
              >
                Add Meal
              </button>
            </div>
          </div>
        ) : (
          <div className="meals-list">
            {meals.map((meal: Meal, index: number) => (
              <div className="meal-card" key={index}>
                <div className="meal-name">{meal.name}</div>
                <div className="meal-info">
                  <div>Calories: {meal.cal}</div>
                  <div>Protein: {meal.pro}g</div>
                  <div>Fat: {meal.fat}g</div>
                </div>
                <div className="meal-edit">&#9776;</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
