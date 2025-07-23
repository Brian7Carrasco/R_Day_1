import React, { useState } from "react";
import "./GoalsPage.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
  Label,
} from "recharts";

const GoalsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<"calories" | "protein">("calories");

  const weeklyProgress = [
    { day: "Mon", cal: 1800, pro: 160 },
    { day: "Tue", cal: 1900, pro: 170 },
    { day: "Wed", cal: 2000, pro: 190 },
    { day: "Thu", cal: 1700, pro: 150 },
    { day: "Fri", cal: 2100, pro: 220 },
    { day: "Sat", cal: 1850, pro: 200 },
    { day: "Sun", cal: 1950, pro: 180 },
  ];

  const calorieGoal = 2000;
  const proteinGoal = 200;

  return (
    <div
      className={`goals-container ${
        viewMode === "protein" ? "protein-mode" : ""
      }`}
    >
      {/* Toggle Switch */}
      <div
        className={`toggle-switch ${viewMode === "protein" ? "active" : ""}`}
        onClick={() =>
          setViewMode(viewMode === "calories" ? "protein" : "calories")
        }
      >
        <div className="slider" />
      </div>

      {/* Line Chart */}
      <div style={{ width: "100%", maxWidth: 500, height: 300, marginTop: 10 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weeklyProgress}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />

            {/* Goal Line */}
            <ReferenceLine
              y={viewMode === "calories" ? calorieGoal : proteinGoal}
              stroke="#aaa"
              strokeDasharray="3 3"
            >
              <Label
                value={viewMode === "calories" ? "Cal Goal" : "Pro Goal"}
                position="insideTopRight"
              />
            </ReferenceLine>

            {/* Line */}
            <Line
              type="monotone"
              dataKey={viewMode === "calories" ? "cal" : "pro"}
              stroke={viewMode === "calories" ? "#4d7c82" : "#4d7c82"}
              strokeWidth={3}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="goal-days-list">
        {weeklyProgress.map((day, index) => (
          <div key={index} className="goal-day-card">
            <div className="goal-day-name">{day.day}</div>
            <div className="goal-day-info">
              {viewMode === "calories" ? (
                <>
                  <div>Goal: {calorieGoal} cal</div>
                  <div>Ate: {day.cal} cal</div>
                </>
              ) : (
                <>
                  <div>Goal: {proteinGoal} g</div>
                  <div>Ate: {day.pro} g</div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsPage;
