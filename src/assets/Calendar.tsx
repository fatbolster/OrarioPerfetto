import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

const MyCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date("2025-01-15T00:00:00")
  );

  const handleDateChange = (value: Date | null) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };

  return (
    <div
      className="App"
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <h1
        style={{ textAlign: "center", color: "#2c3e50", marginBottom: "20px" }}
      >
        Personal Assistant Calendar
      </h1>
      <div
        className="calendar-container"
        style={{
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Calendar
          onChange={(value) => handleDateChange(value as Date | null)}
          value={selectedDate}
          selectRange={false}
          className="custom-calendar"
          showNavigation={true}
          showNeighboringMonth={false}
        />
      </div>
    </div>
  );
};

export default MyCalendar;
