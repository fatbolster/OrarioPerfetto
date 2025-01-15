import React, { useState } from "react";
import SideBar from "../assets/Sidebar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarComponent from "../assets/Calendar";
import { useNavigate } from "react-router-dom";

const EventPage = () => {
  const navigate = useNavigate();

  const handleDateSelection = (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0];
    if (mockMeetings[formattedDate]) {
      // Redirect to the dynamic URL if a meeting exists
      navigate(`/events/${formattedDate}`);
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

  const [summary, setSummary] = useState<string>(
    "Select a date to view the summary."
  );

  const handleTaskToggle = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleCreateTask = () => {
    alert(
      "Create Task Popup (You can replace this with an actual popup modal)."
    );
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
      title: "Current Tasks/Meetings",
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
      title: "Create Task",
      content: (
        <div>
          <button
            onClick={handleCreateTask}
            style={{
              padding: "10px 15px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Create Task
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
    </div>
  );
};

export default EventPage;
