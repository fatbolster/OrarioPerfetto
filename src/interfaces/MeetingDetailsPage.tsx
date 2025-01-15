import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../assets/Sidebar"; // Import Sidebar component

const mockMeetingData = {
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

const MeetingDetailsPage: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  const meeting = mockMeetingData[date || ""];

  const navigate = useNavigate();

  if (!meeting) {
    return <h2>No meeting data available for {date}</h2>;
  }

  // Sidebar content
  const sidebarSections = [
    {
      title: "Profile Overview",
      content: (
        <div>
          <p>
            <strong>Name:</strong> John Doe
          </p>
          <p>
            <strong>Title:</strong> Software Engineer
          </p>
          <p>
            <strong>Department:</strong> Engineering
          </p>
        </div>
      ),
    },
    {
      title: "Project 1",
      content: (
        <div style={{ padding: "10px", fontSize: "14px", color: "#333" }}>
          <div style={{ marginBottom: "10px" }}>
            <strong>Description:</strong> Redesign the company website to
            improve user experience and accessibility.
          </div>
          <div>
            <strong>People Involved:</strong>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              {["John Doe", "Alice Smith", "Emma Watson"].map((person, idx) => (
                <button
                  key={idx}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onClick={() => alert(`Clicked on ${person}`)} // Example click handler
                >
                  <span>{person}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Incomplete Tasks",
      content: (
        <div>
          <ul>
            <li>Create Wireframes </li>
            <li>Develop Landing Page</li>
          </ul>
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <button
              onClick={() => navigate("/event")}
              style={{
                padding: "8px 15px",
                backgroundColor: "#ff0000", // Red color
                color: "#fff", // White text for contrast
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              {" "}
              Back
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden", // Prevent unwanted scrolling
      }}
    >
      {/* Sidebar */}
      <Sidebar sections={sidebarSections} layoutMode="three-div" />

      {/* Main Content */}
      <div
        style={{
          flex: 1, // Occupy remaining width
          padding: "20px",
          backgroundColor: "#000", // Black background
          color: "#fff", // White text for readability
          overflowY: "auto", // Enable vertical scrolling if content overflows
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#fff" }}>
          AI Summary of Meeting
        </h2>

        {/* AI Summary Section */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "10px", color: "#fff" }}>AI Summary</h3>
          <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#fff" }}>
            {meeting.summary}
          </p>
        </div>

        {/* People Involved Section */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "10px", color: "#fff" }}>
            People Involved
          </h3>
          <ul>
            {meeting.peopleInvolved.map((person, idx) => (
              <li key={idx} style={{ color: "#fff" }}>
                {person}
              </li>
            ))}
          </ul>
        </div>

        {/* Decisions Made Section */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "10px", color: "#fff" }}>
            Decisions Made
          </h3>
          <ul>
            {meeting.decisionsMade.map((decision, idx) => (
              <li key={idx} style={{ color: "#fff" }}>
                {decision}
              </li>
            ))}
          </ul>
        </div>

        {/* Outstanding Questions Section */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "10px", color: "#fff" }}>
            Outstanding Questions
          </h3>
          <ul>
            {meeting.outstandingQuestions.map((question, idx) => (
              <li key={idx} style={{ color: "#fff" }}>
                {question}
              </li>
            ))}
          </ul>
        </div>

        {/* Concerns Raised Section */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "10px", color: "#fff" }}>
            Concerns Raised
          </h3>
          <ul>
            {meeting.concernsRaised.map((concern, idx) => (
              <li key={idx} style={{ color: "#fff" }}>
                {concern}
              </li>
            ))}
          </ul>
        </div>

        {/* Additional Tasks Section */}
        <div>
          <h3 style={{ marginBottom: "10px", color: "#fff" }}>
            Additional Tasks
          </h3>
          <ul>
            {meeting.additionalTasks.map((task, idx) => (
              <li key={idx} style={{ color: "#fff" }}>
                {task}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetailsPage;
