import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../assets/Sidebar"; // Import Sidebar component
import "../css/MeetingDetailsPage.css"; // Import CSS file

// Mock Meeting Data
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

const MeetingDetailsPage: React.FC = () => {
  const { date } = useParams<{ date: string }>(); // Get date from URL
  const navigate = useNavigate();

  const meeting = mockMeetingData[date || ""]; // Access meeting data by date

  if (!meeting) {
    return (
      <div className="no-meeting-container">
        <h2>No meeting data available for {date}</h2>
        <button className="back-button" onClick={() => navigate("/")}>
          Back to Calendar
        </button>
      </div>
    );
  }

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
        <div>
          <strong>Description:</strong> Redesign the company website to improve
          user experience and accessibility.
        </div>
      ),
    },
    {
      title: "Incomplete Tasks",
      content: (
        <div>
          <ul>
            <li>Create Wireframes</li>
            <li>Develop Landing Page</li>
          </ul>
          <button className="back-button" onClick={() => navigate("/")}>
            Back
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="meeting-page-container">
      {/* Sidebar */}
      <Sidebar sections={sidebarSections} layoutMode="three-div" />

      {/* Main Content */}
      <div className="main-content">
        <div className="section">
          <h2>AI Summary of Meeting</h2>
          <p>{meeting.summary}</p>
        </div>

        <div className="section">
          <h3>People Involved</h3>
          <ul>
            {meeting.peopleInvolved.map((person: string, idx: number) => (
              <li key={idx}>{person}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h3>Decisions Made</h3>
          <ul>
            {meeting.decisionsMade.map((decision: string, idx: number) => (
              <li key={idx}>{decision}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h3>Outstanding Questions</h3>
          <ul>
            {meeting.outstandingQuestions.map(
              (question: string, idx: number) => (
                <li key={idx}>{question}</li>
              )
            )}
          </ul>
        </div>

        <div className="section">
          <h3>Concerns Raised</h3>
          <ul>
            {meeting.concernsRaised.map((concern: string, idx: number) => (
              <li key={idx}>{concern}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h3>Additional Tasks</h3>
          <ul>
            {meeting.additionalTasks.map((task: string, idx: number) => (
              <li key={idx}>{task}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetailsPage;
