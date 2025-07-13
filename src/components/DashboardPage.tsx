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
  const [showOptionsIndex, setShowOptionsIndex] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const getDateKey = (date: Date) => date.toISOString().split("T")[0];
  const currentKey = getDateKey(selectedDay);
  const meals = mealsByDate[currentKey] || [];

  const caloriesGoal = 2000;
  const proteinGoal = 200;

  const todayCalories = meals.reduce((sum, meal) => sum + meal.cal, 0);
  const todayProtein = meals.reduce((sum, meal) => sum + meal.pro, 0);

  const ringValue = viewMode === "calories" ? todayCalories : todayProtein;
  const ringGoal = viewMode === "calories" ? caloriesGoal : proteinGoal;
  const ringLabel = viewMode === "calories" ? "Calories" : "Protein";
  const ringSub =
    viewMode === "calories"
      ? `Daily: ${caloriesGoal} cal`
      : `Daily: ${proteinGoal} g`;
  const ringLeft = Math.max(0, ringGoal - ringValue);
  const ringLeftLabel =
    viewMode === "calories" ? `Left ${ringLeft} cal` : `Left ${ringLeft} g`;
  const ringStroke = viewMode === "calories" ? "#188a8a" : "#276c6f";
  const ringCircumference = 2 * Math.PI * 115;
  const ringProgress = Math.min(ringValue / ringGoal, 1);
  const ringDashoffset = ringCircumference * (1 - ringProgress);

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
    const newDay = new Date(centerDay);
    newDay.setDate(centerDay.getDate() - 1);
    setCenterDay(newDay);
  };

  const handleScrollRight = () => {
    const newDay = new Date(centerDay);
    newDay.setDate(centerDay.getDate() + 1);
    setCenterDay(newDay);
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

    const updatedMeals = [...meals, newMeal];
    setMealsByDate((prev) => ({ ...prev, [currentKey]: updatedMeals }));

    setNewMealName("");
    setNewMealCalories("");
    setNewMealProtein("");
    setNewMealFat("");
    setMealType("Breakfast");
    setShowAddMealForm(false);
  };

  const handleRemoveMeal = (index: number) => {
    const updated = meals.filter((_, i) => i !== index);
    setMealsByDate((prev) => ({ ...prev, [currentKey]: updated }));
    setShowOptionsIndex(null);
  };

  const handleEditMeal = (index: number) => {
    const meal = meals[index];
    const nameParts = meal.name.split(": ");
    setMealType(nameParts[0]);
    setNewMealName(nameParts[1]);
    setNewMealCalories(meal.cal.toString());
    setNewMealProtein(meal.pro.toString());
    setNewMealFat(meal.fat.toString());
    setEditIndex(index);
    setShowAddMealForm(true);
    setShowOptionsIndex(null);
  };

  const handleSaveEdit = () => {
    if (editIndex === null) return;
    const updatedMeal: Meal = {
      name: `${mealType}: ${newMealName}`,
      cal: parseInt(newMealCalories),
      pro: parseInt(newMealProtein),
      fat: parseInt(newMealFat),
    };

    const updatedMeals = meals.map((m, i) =>
      i === editIndex ? updatedMeal : m
    );
    setMealsByDate((prev) => ({ ...prev, [currentKey]: updatedMeals }));

    setNewMealName("");
    setNewMealCalories("");
    setNewMealProtein("");
    setNewMealFat("");
    setMealType("Breakfast");
    setEditIndex(null);
    setShowAddMealForm(false);
  };

  return (
    <div
      className={`dashboard-container ${
        viewMode === "protein" ? "protein-mode" : ""
      }`}
    >
      {/* Date Selector */}
      <div className="dashboard-days-scroll">
        <button className="scroll-button" onClick={handleScrollLeft}>
          ←
        </button>
        <div className="days-container">
          {getVisibleDays().map((day, i) => {
            const isSelected =
              day.toDateString() === selectedDay.toDateString();
            return (
              <div
                key={i}
                className={`day-pill ${isSelected ? "selected" : ""}`}
                onClick={() => handleDayClick(day)}
              >
                <div className="day-letter">
                  {day
                    .toLocaleDateString("en-US", { weekday: "short" })
                    .charAt(0)}
                </div>
                <div className="day-date">{day.getDate()}</div>
              </div>
            );
          })}
        </div>
        <button className="scroll-button" onClick={handleScrollRight}>
          →
        </button>
      </div>

      {/* Toggle View */}
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

      {/* Day/Week Toggle */}
      <div className="dashboard-switch">
        <button
          className={timeFrame === "day" ? "active" : ""}
          onClick={() => setTimeFrame("day")}
        >
          Day
        </button>
        <button
          className={timeFrame === "week" ? "active" : ""}
          onClick={() => setTimeFrame("week")}
        >
          Week
        </button>
      </div>

      {/* Meals Section */}
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

        {showAddMealForm && (
          <div className="add-meal-panel">
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
                className="RegisterPage-button"
                onClick={() => setShowAddMealForm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="RegisterPage-button"
                onClick={editIndex !== null ? handleSaveEdit : handleAddMeal}
              >
                {editIndex !== null ? "Save" : "Add Meal"}
              </button>
            </div>
          </div>
        )}

        <div className="meals-list">
          {meals.map((meal, index) => (
            <div className="meal-card" key={index}>
              <div className="meal-name">{meal.name}</div>
              <div className="meal-info">
                <div>Calories: {meal.cal}</div>
                <div>Protein: {meal.pro}g</div>
                <div>Fat: {meal.fat}g</div>
              </div>
              <div
                className="meal-edit"
                onClick={() =>
                  setShowOptionsIndex(showOptionsIndex === index ? null : index)
                }
              >
                &#9776;
              </div>
              {showOptionsIndex === index && (
                <div className="meal-options">
                  <button onClick={() => handleEditMeal(index)}>Edit</button>
                  <button onClick={() => handleRemoveMeal(index)}>
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
