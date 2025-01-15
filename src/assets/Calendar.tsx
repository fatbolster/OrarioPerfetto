import React, { useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom"; // For navigation
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

interface MeetingDetails {
  date: string;
  summary: string;
  peopleInvolved: string[];
  decisionsMade: string[];
  outstandingQuestions: string[];
  concernsRaised: string[];
  additionalTasks: string[];
}

const mockMeetingData: Record<string, MeetingDetails> = {
  "2025-01-15": {
    date: "2025-01-15",
    summary: "Discussion on project progress and roadmap adjustments.",
    peopleInvolved: ["John Doe", "Emma Watson", "Alice Smith"],
    decisionsMade: [
      "Extend sprint duration by one week.",
      "Hire two QA engineers.",
    ],
    outstandingQuestions: [
      "What is the expected delay on deliverables?",
      "Who will oversee the new testing process?",
    ],
    concernsRaised: [
      "Resource allocation remains unclear.",
      "Potential impact on integration timelines.",
    ],
    additionalTasks: [
      "Schedule a follow-up meeting.",
      "Update the project roadmap.",
    ],
  },
  "2025-01-16": {
    date: "2025-01-16",
    summary: "Sprint planning for Q1 deliverables.",
    peopleInvolved: ["Bob Johnson", "Alice Brown"],
    decisionsMade: ["Prioritize feature X for release.", "Add two engineers."],
    outstandingQuestions: ["What are the testing dependencies?"],
    concernsRaised: ["Tight deadlines for module Y."],
    additionalTasks: ["Schedule stakeholder meeting.", "Prepare test plans."],
  },
};

const MyCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const navigate = useNavigate();

  // Handles when a date is clicked
  const handleDateClick = (value: Date | null) => {
    if (value instanceof Date) {
      const formattedDate = value.toISOString().split("T")[0];
      setSelectedDate(value);

      if (mockMeetingData[formattedDate]) {
        navigate(`/details/${formattedDate}`); // Navigate to meeting details page
      } else {
        alert("No meeting data available for this date."); // No meeting found
      }
    }
  };

  // Render function to highlight dates with meetings
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const formattedDate = date.toISOString().split("T")[0];
      return formattedDate in mockMeetingData ? "highlight-date" : "";
    }
    return "";
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
          onClickDay={(value) => handleDateClick(value)}
          value={selectedDate}
          tileClassName={tileClassName} // Highlight dates with meetings
          selectRange={false}
          className="custom-calendar"
          showNavigation={true}
          showNeighboringMonth={false}
        />
      </div>
      {/* Display the selected date or meeting summary */}
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          borderRadius: "10px",
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {selectedDate ? (
          <p style={{ fontSize: "16px", color: "#2c3e50" }}>
            Selected Date: {selectedDate.toDateString()}
          </p>
        ) : (
          <p style={{ fontSize: "16px", color: "#2c3e50" }}>
            Click a date to see more details.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyCalendar;
