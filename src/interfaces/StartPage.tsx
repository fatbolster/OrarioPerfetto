import EmailBox from "../assets/EmailBox";
import EmailDetails from "../assets/EmailDetails";
import FilterBar from "../assets/FilterBar";
import { useState, useEffect } from "react";
import SideBar from "../assets/Sidebar";
import "../css/StartPage.css";
import { useNavigate } from "react-router-dom";

type Email = {
  id: number;
  subject: string;
  summary: string;
  urgency: string;
  content: string;
};

const StartPage = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [filteredEmails, setFilteredEmails] = useState<Email[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigate = useNavigate(); // Hook for navigation

  const navigateToEvent = () => {
    navigate("/event"); // Navigate to the /event route
  };

  const mockEmails: Email[] = [
    {
      id: 1,
      subject: "Urgent: Deadline Tomorrow",
      summary: "The project deadline is tomorrow. Please review and submit.",
      urgency: "Urgent",
      content:
        "Dear Team, The project deadline is tomorrow. Please review and submit all files.",
    },
    {
      id: 2,
      subject: "Team Meeting Next Week",
      summary: "A team meeting is scheduled for next week. Mark your calendar.",
      urgency: "Not Urgent",
      content:
        "Hi Team, We have a team meeting scheduled for next week to discuss the project roadmap.",
    },
  ];

  useEffect(() => {
    setEmails(mockEmails);
    setFilteredEmails(mockEmails);
  }, []);

  const applyFilter = (filter: string) => {
    setFilter(filter);
    if (filter === "All") {
      setFilteredEmails(mockEmails);
    } else {
      setFilteredEmails(emails.filter((email) => email.urgency === filter));
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    setFilteredEmails(
      emails.filter(
        (email) =>
          email.subject.toLowerCase().includes(query) &&
          (filter === "All" || email.urgency === filter)
      )
    );
  };

  const handleEmailSelect = (email: Email) => {
    setSelectedEmail(email);
  };

  const handleCloseDetails = () => {
    setSelectedEmail(null);
  };

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
      title: "Events",
      content: (
        <div>
          {/* Urgent Tasks */}
          <div
            style={{
              border: "3px solid #f5c6cb",
              borderRadius: "5px",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <h4 style={{ color: "#721c24", margin: 0 }}>Urgent</h4>
            <ul>
              <li>Complete this task immediately!</li>
              <li>Respond to the client's email now!</li>
            </ul>
          </div>

          {/* Mildly Urgent Tasks */}
          <div
            style={{
              border: "3px solid #ffeeba",
              borderRadius: "5px",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <h4 style={{ color: "#856404", margin: 0 }}>Mildly Urgent</h4>
            <ul>
              <li>Review the report for tomorrow's meeting.</li>
              <li>Schedule a meeting with the team.</li>
            </ul>
          </div>

          {/* Non-Urgent Tasks */}
          <div
            style={{
              border: "3px solid #c3e6cb",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <h4 style={{ color: "#155724", margin: 0 }}>Non-Urgent</h4>
            <ul>
              <li>Organize your workspace.</li>
              <li>Update your project documentation.</li>
            </ul>
          </div>

          {/* Button */}
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() => navigateToEvent()}
              style={{
                padding: "10px 15px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              View Events
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="App">
      {/* Sidebar */}
      <div
        className="sidebar"
        style={{
          position: "fixed", // Fix the sidebar to the left
          top: 0,
          left: 0,
          width: "250px", // Set sidebar width
          height: "100vh", // Full height of the viewport
          backgroundColor: "#f4f4f4",
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
          padding: "20px",
        }}
      >
        <SideBar sections={sidebarSections} layoutMode="two-div" />
      </div>

      {/* Main Content */}
      <div
        style={{
          marginLeft: "250px", // Leave space for the sidebar
          padding: "20px",
        }}
      >
        {/* Header */}
        <h1 className="header">Orario Perfetto</h1>

        {/* Content Container */}
        <div className="content-container">
          {/* Right Section */}
          <div className="right-section">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search email by title"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <FilterBar filter={filter} applyFilter={applyFilter} />

            {!selectedEmail ? (
              <EmailBox
                emails={filteredEmails}
                setSelectedEmail={handleEmailSelect}
              />
            ) : (
              <EmailDetails
                email={selectedEmail}
                onClose={handleCloseDetails}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
