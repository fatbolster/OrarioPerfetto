import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

const mockSummaries: Record<string, string> = {
  "2025-01-15": `Meeting Summary for January 15, 2025:
  - Discussion Points:
    - Finalized plans for the upcoming team presentation.
    - Reviewed progress on Q1 goals.
  - Tasks Assigned:
    - Team to gather final feedback from stakeholders.
    - Prepare the slide deck and practice the presentation.
  - Upcoming Deadlines:
    - Confirm meeting availability by January 16.
    - Submit final presentation edits by January 20.
  - Notes:
    - Prototype milestone reached and acknowledged during the meeting.`,
  "2025-02-10": `Meeting Summary for February 10, 2025:
  - Discussion Points:
    - Reviewed team performance and progress on project milestones.
    - Discussed potential risks and mitigation strategies.
  - Tasks Assigned:
    - Update the project timeline with new changes.
    - Schedule a follow-up meeting with external stakeholders.
  - Upcoming Deadlines:
    - Complete the integration testing by February 15.
  - Notes:
    - Positive client feedback received for the latest prototype.`,
};

const adjustDateForTimezone = (date: Date): string => {
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(date.getTime() - userTimezoneOffset);
  return adjustedDate.toISOString().split("T")[0];
};

const MyCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date("2025-01-15T00:00:00")
  );
  const [summary, setSummary] = useState<string>(
    "Select a date to view the summary."
  );

  const handleDateChange = (value: Date | null) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      const formattedDate = adjustDateForTimezone(value);
      setSummary(
        mockSummaries[formattedDate] || "No summary available for this date."
      );
    } else {
      setSummary("Invalid date selected.");
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
          tileClassName={({ date, view }) =>
            view === "month" &&
            date.toISOString().split("T")[0] in mockSummaries
              ? "highlight-date"
              : ""
          }
          showNavigation={true}
          showNeighboringMonth={false}
        />
      </div>
      <div
        className="summary-container"
        style={{
          marginTop: "30px",
          padding: "30px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ color: "#34495e", fontSize: "24px", textAlign: "center" }}>
          Summary for {selectedDate.toDateString()}
        </h2>
        <p style={{ fontSize: "18px", lineHeight: "1.8", textAlign: "center" }}>
          {summary}
        </p>
      </div>
    </div>
  );
};

export default MyCalendar;
