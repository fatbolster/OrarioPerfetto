import React, { useState } from "react";
import Calendar from "react-calendar";
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { useNavigate } from "react-router-dom"; // For navigation
=======
=======
>>>>>>> Stashed changes
import { fetchWithAuth } from "../api"; // Authenticated request utility
import { useNavigate } from "react-router-dom";
>>>>>>> Stashed changes
import "react-calendar/dist/Calendar.css";
import "./Calendar.css"; // Ensure this file contains styles for unavailable-date

interface MeetingDetails {
  date: string;
  summary: string;
  peopleInvolved: string[];
  decisionsMade: string[];
  outstandingQuestions: string[];
  concernsRaised: string[];
  additionalTasks: string[];
}

const mockMeetingData: Record<string, any> = {
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
  "2025-01-12": {
    date: "2025-01-12",
    summary: "Kick-off meeting for the new product launch.",
    peopleInvolved: ["Emma Carter", "Liam Adams", "Sophia Turner"],
    decisionsMade: [
      "Set the product launch date to March 15, 2025.",
      "Approve the initial marketing budget.",
    ],
    outstandingQuestions: [
      "What is the expected audience reach for the first phase?",
      "Are additional partnerships needed for the launch?",
    ],
    concernsRaised: [
      "Tight deadlines for marketing material preparation.",
      "Limited bandwidth of the design team for launch assets.",
    ],
    additionalTasks: [
      "Create a detailed launch roadmap.",
      "Organize a meeting with the design and marketing teams.",
    ],
  },
  "2025-01-13": {
    date: "2025-01-13",
    summary: "Technical discussion on backend architecture upgrades.",
    peopleInvolved: ["Noah Harris", "Olivia Gray", "Mason Thomas"],
    decisionsMade: [
      "Adopt a microservices-based architecture.",
      "Allocate two engineers to the database migration project.",
    ],
    outstandingQuestions: [
      "What are the potential risks during migration?",
      "How will the changes impact existing user workflows?",
    ],
    concernsRaised: [
      "Compatibility issues with older modules.",
      "Limited time for thorough testing before deployment.",
    ],
    additionalTasks: [
      "Perform a risk assessment for the migration process.",
      "Set up a testing environment for the new architecture.",
    ],
  },
};
<<<<<<< Updated upstream

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
<<<<<<< Updated upstream
  const navigate = useNavigate();

  // Handles when a date is clicked
=======
=======

const MyCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
>>>>>>> Stashed changes
  const [unavailableDates, setUnavailableDates] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUnavailableDates = async () => {
      try {
        const data = await fetchWithAuth("/calendar/unavailable-dates");
        console.log("Fetched unavailable dates:", data.unavailableDates);
        setUnavailableDates(data.unavailableDates || []);
      } catch (error) {
        console.error("Failed to fetch unavailable dates:", error);
      }
    };
    getUnavailableDates();
  }, []);

  useEffect(() => {
    // Log the unavailable dates whenever the state updates
    console.log("Updated unavailable dates in state:", unavailableDates);
  }, [unavailableDates]);

  // Highlight unavailable dates
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      // Normalize the date to UTC format (YYYY-MM-DD)
      const formattedDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      if (unavailableDates.includes(formattedDate)) {
        return "unavailable-date"; // Apply CSS class for unavailable dates
      }
    }
    return ""; // Default: no class
  };

<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
<<<<<<< Updated upstream
  // Render function to highlight dates with meetings
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const formattedDate = date.toISOString().split("T")[0];
      return formattedDate in mockMeetingData ? "highlight-date" : "";
    }
    return "";
  };

=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
          value={selectedDate}
          tileClassName={tileClassName} // Highlight dates with meetings
=======
          tileClassName={tileClassName} // Highlight unavailable dates
>>>>>>> Stashed changes
=======
          tileClassName={tileClassName} // Highlight unavailable dates
>>>>>>> Stashed changes
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
