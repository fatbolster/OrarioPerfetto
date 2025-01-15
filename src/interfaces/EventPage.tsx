import React, { useState } from "react";
import SideBar from "../assets/Sidebar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarComponent from "../assets/Calendar";
import { useNavigate } from "react-router-dom";

const EventPage = () => {
  const navigate = useNavigate();
  const [meetingTitle, setMeetingTitle] = useState<string>("");
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([]);
  const [selectedMeetingDate, setSelectedMeetingDate] = useState<string[]>([]);

  const toggleTeamMemberSelection = (memberName: string) => {
    setSelectedTeamMembers(
      (prev) =>
        prev.includes(memberName)
          ? prev.filter((m) => m !== memberName) // Remove if already selected
          : [...prev, memberName] // Add if not already selected
    );
  };

  const toggleMeetingDateSelection = (date: string) => {
    setSelectedMeetingDate(
      (prev) =>
        prev.includes(date)
          ? prev.filter((d) => d !== date) // Remove if already selected
          : [...prev, date] // Add if not already selected
    );
  };

  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date("2025-01-15T00:00:00")
  );

  const [availableDates, setAvailableDates] = useState<string[]>([]);

  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>("1 week");
  const [meetings, setMeetings] = useState<Record<string, MeetingDetails>>({});
  const [timeFrame, setTimeFrame] = useState<number>(1);
  const [teamMembers, setTeamMembers] = useState<TeamMemberAvailability[]>([
    {
      name: "James",
      unavailableDates: ["2025-01-16", "2025-01-17", "2025-01-19"],
    },
    {
      name: "Tom",
      unavailableDates: ["2025-01-20", "2025-01-21", "2025-01-22"],
    },
    { name: "Alice", unavailableDates: ["2025-01-18"] },
    { name: "Emma", unavailableDates: ["2025-01-25"] },
    { name: "Michael", unavailableDates: ["2025-01-27", "2025-01-28"] },
    { name: "Sophia", unavailableDates: [] },
  ]);

  const handleDateSelection = (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0];
    if (mockMeetings[formattedDate]) {
      // Redirect to the dynamic URL if a meeting exists
      navigate(`/event/${formattedDate}`);
    } else {
      // Optional: Show an alert or message
      setSummary("No meetings scheduled for this date.");
    }
  };
  const [tasks, setTasks] = useState([
    { id: 1, name: "Project 1", completed: false },
    { id: 2, name: "Project 2", completed: false },
    { id: 3, name: "Admin Work", completed: false },
  ]);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const [summary, setSummary] = useState<string>(
    "Select a date to view the summary."
  );

  const findAvailableDates = (): string[] => {
    const today = new Date("2025-01-15");
    const allDates = Array.from(
      { length: 31 },
      (_, i) =>
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)
    );

    const startDay = today;
    const endDay = new Date(today);
    endDay.setDate(today.getDate() + timeFrame * 7);

    const validDates = allDates
      .filter((date) => date >= startDay && date <= endDay)
      .map((date) => date.toISOString().split("T")[0])
      .filter(
        (date) =>
          !teamMembers.some(
            (member) =>
              selectedTeamMembers.includes(member.name) &&
              member.unavailableDates.includes(date)
          )
      );

    if (validDates.length === 0) {
      setTimeFrame((prev) => prev + 1);
      return [];
    }

    return validDates;
  };

  const handleTaskToggle = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleCreateProject = () => {
    const dates = findAvailableDates();
    setAvailableDates(dates);
    setShowPopup(true);
  };

  const handleSubmit = () => {
    if (!meetingTitle) {
      alert("Please enter a meeting title.");
      return;
    }

    if (!selectedMeetingDate) {
      alert("Please select a meeting date.");
      return;
    }

    if (selectedTeamMembers.length === 0) {
      alert("Please select at least one team member.");
      return;
    }

    // Add the meeting to the meetings state
    const newMeeting = {
      title: meetingTitle,
      date: selectedMeetingDate,
      members: selectedTeamMembers,
    };

    setMeetings((prevMeetings) => ({
      ...prevMeetings,
      [selectedMeetingDate]: newMeeting,
    }));

    alert(
      `Meeting '${meetingTitle}' scheduled successfully on ${selectedMeetingDate}`
    );

    // Reset form fields and close popup
    setMeetingTitle("");
    setSelectedMeetingDate(null);
    setSelectedTeamMembers([]);
    setShowPopup(false);
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
      title: "Current Projects",
      content: (
        <div>
          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleTaskToggle(task.id)}
                style={{ marginRight: "10px" }}
              />
              <span
                style={{
                  color:
                    task.id === 1 ? "red" : task.id === 2 ? "blue" : "black",
                }}
              >
                {task.name}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Create Project",
      content: (
        <div>
          <button
            onClick={handleCreateProject}
            style={{
              padding: "10px 15px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Create Project
          </button>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden", // Prevent any unwanted scrolling
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          position: "fixed", // Sidebar is fixed
          width: "250px", // Fixed width for the sidebar
          height: "100vh",
          backgroundColor: "#f4f4f4",
        }}
      >
        <SideBar sections={sidebarSections} layoutMode="three-div" />
      </div>

      {/* Main Content */}
      <div
        style={{
          marginLeft: "250px", // Leave space for the fixed sidebar
          flex: 1, // Occupy the remaining width
          display: "flex",
          justifyContent: "center", // Center the calendar horizontally
          alignItems: "center", // Center the calendar vertically
          backgroundColor: "#2b2b2b",
        }}
      >
        {/* Calendar Container */}
        <div
          style={{
            width: "80%", // Occupy 80% of the remaining space
            maxWidth: "1200px", // Optional: Limit the width
            height: "80vh",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          <CalendarComponent onDateSelect={handleDateSelection} />
        </div>
      </div>

      {/* Popup Component */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -20%)",
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            width: "400px",
          }}
        >
          <h3
            style={{
              marginBottom: "20px",
              textAlign: "center",
              color: "#000", // Black font
              fontWeight: "bold",
            }}
          >
            Schedule a Meeting
          </h3>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "bold",
                color: "#000", // Black font
              }}
            >
              Meeting Title
            </label>
            <input
              type="text"
              placeholder="Enter meeting title"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "20px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                color: "#000", // Black font
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "bold",
                color: "#000", // Black font
              }}
            >
              Add team members
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {teamMembers.map((member, index) => (
                <button
                  key={index}
                  onClick={() => toggleTeamMemberSelection(member.name)}
                  style={{
                    padding: "10px",
                    backgroundColor: selectedTeamMembers.includes(member.name)
                      ? "#3498db"
                      : "#f1f1f1", // Highlight selected
                    color: "#000", // Black font
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {member.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "bold",
                color: "#000", // Black font
              }}
            >
              Available dates
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {availableDates.map((date, index) => (
                <button
                  key={index}
                  onClick={() => toggleMeetingDateSelection(date)}
                  style={{
                    padding: "10px",
                    backgroundColor: selectedMeetingDate.includes(date)
                      ? "#3498db"
                      : "#f1f1f1", // Highlight selected
                    color: "#000", // Black font
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              padding: "12px 0",
              backgroundColor: "#2ecc71",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Schedule Meeting
          </button>
          <button
            onClick={() => setShowPopup(false)}
            style={{
              width: "100%",
              padding: "12px 0",
              marginTop: "10px",
              backgroundColor: "#e74c3c",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default EventPage;
