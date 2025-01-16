import React, { useState, useEffect } from "react";
import SideBar from "../assets/Sidebar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarComponent from "../assets/Calendar";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../api";

const EventPage = () => {
  const navigate = useNavigate();
  const [meetingTitle, setMeetingTitle] = useState<string>("");
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([]);
  const [selectedMeetingDate, setSelectedMeetingDate] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [unavailableDates, setUnavailableDates] = useState<string[]>([]);

  const [teamMembers, setTeamMembers] = useState<TeamMemberAvailability[]>([
    {
      name: "James",
      unavailableDates: [
        "2025-01-03",
        "2025-01-05",
        "2025-01-07",
        "2025-01-10",
        "2025-01-16",
        "2025-01-17",
        "2025-01-19",
        "2025-01-23",
        "2025-01-26",
      ],
    },
    {
      name: "Tom",
      unavailableDates: [
        "2025-01-02",
        "2025-01-06",
        "2025-01-08",
        "2025-01-11",
        "2025-01-20",
        "2025-01-21",
        "2025-01-22",
        "2025-01-25",
        "2025-01-28",
      ],
    },
    {
      name: "Alice",
      unavailableDates: [
        "2025-01-01",
        "2025-01-04",
        "2025-01-09",
        "2025-01-13",
        "2025-01-18",
        "2025-01-24",
        "2025-01-27",
        "2025-01-29",
      ],
    },
    {
      name: "Emma",
      unavailableDates: [
        "2025-01-03",
        "2025-01-06",
        "2025-01-09",
        "2025-01-12",
        "2025-01-15",
        "2025-01-20",
        "2025-01-25",
      ],
    },
    {
      name: "Michael",
      unavailableDates: [
        "2025-01-02",
        "2025-01-05",
        "2025-01-08",
        "2025-01-14",
        "2025-01-18",
        "2025-01-22",
        "2025-01-27",
        "2025-01-28",
      ],
    },
    {
      name: "Sophia",
      unavailableDates: [
        "2025-01-07",
        "2025-01-10",
        "2025-01-13",
        "2025-01-17",
        "2025-01-21",
        "2025-01-26",
      ],
    },
  ]);

  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        const response = await fetchWithAuth("/calendar/unavailable-dates");

        if (response.ok) {
          const data = await response.json();

          // Extract the array of unavailable dates from the response
          if (data && Array.isArray(data.unavailableDates)) {
            setUnavailableDates(data.unavailableDates);
            initializeAvailableDates(data.unavailableDates); // Pass the array of dates
          } else {
            console.error(
              "Unexpected data format for unavailable dates:",
              data
            );
          }
        } else {
          console.error(
            "Failed to fetch unavailable dates:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching unavailable dates:", error);
      }
    };

    fetchUnavailableDates();
  }, []);

  const initializeAvailableDates = (unavailableDates: string[]) => {
    const startDate = new Date("2025-01-01");
    const endDate = new Date("2025-01-31");
    const allDates: string[] = [];

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = new Date(d).toISOString().split("T")[0];
      if (!unavailableDates.includes(dateStr)) {
        allDates.push(dateStr);
      }
    }

    setAvailableDates(allDates);
  };

  const toggleTeamMemberSelection = (memberName: string) => {
    setSelectedTeamMembers((prev) => {
      const updatedSelection = prev.includes(memberName)
        ? prev.filter((m) => m !== memberName)
        : [...prev, memberName];

      updateAvailableDatesForMembers(updatedSelection);
      return updatedSelection;
    });
  };

  const updateAvailableDatesForMembers = (selectedMembers: string[]) => {
    const startDate = new Date("2025-01-01");
    const endDate = new Date("2025-01-31");
    const allDates: string[] = [];

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = new Date(d).toISOString().split("T")[0];

      const isUnavailableByUser = unavailableDates.includes(dateStr);
      const isUnavailableByMembers = teamMembers.some(
        (member) =>
          selectedMembers.includes(member.name) &&
          member.unavailableDates.includes(dateStr)
      );

      if (!isUnavailableByUser && !isUnavailableByMembers) {
        allDates.push(dateStr);
      }
    }

    setAvailableDates(allDates);
  };

  const toggleMeetingDateSelection = (date: string) => {
    setSelectedMeetingDate(
      (prev) =>
        prev.includes(date)
          ? prev.filter((d) => d !== date) // Remove if already selected
          : [...prev, date] // Add if not already selected
    );
  };

  const handleSubmit = async () => {
    if (!meetingTitle) {
      alert("Please enter a meeting title.");
      return;
    }

    if (selectedMeetingDate.length === 0) {
      alert("Please select at least one meeting date.");
      return;
    }

    if (selectedTeamMembers.length === 0) {
      alert("Please select at least one team member.");
      return;
    }

    try {
      const response = await fetchWithAuth("/calendar/add-dates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: selectedMeetingDate }),
      });

      if (response.ok) {
        alert(`Meeting '${meetingTitle}' scheduled successfully!`);
        setShowPopup(false);
      } else {
        const errorData = await response.json();
        alert(`Failed to schedule meeting: ${errorData.message}`);
      }
    } catch (error) {
      alert(error.message || "An unexpected error occurred.");
    }
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
          <p>Project 1</p>
          <p>Project 2</p>
        </div>
      ),
    },
    {
      title: "Create Project",
      content: (
        <button
          onClick={() => setShowPopup(true)}
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
      ),
    },
  ];

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          position: "fixed",
          width: "250px",
          height: "100vh",
          backgroundColor: "#f4f4f4",
        }}
      >
        <SideBar sections={sidebarSections} />
      </div>
      <div
        style={{
          marginLeft: "250px",
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#2b2b2b",
        }}
      >
        <CalendarComponent />
      </div>
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -20%)",
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
            Schedule a Meeting
          </h3>
          <div style={{ marginBottom: "15px" }}>
            <label>Meeting Title</label>
            <input
              type="text"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Add team members</label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "5px",
              }}
            >
              {teamMembers.map((member) => (
                <button
                  key={member.name}
                  onClick={() => toggleTeamMemberSelection(member.name)}
                  style={{
                    padding: "8px",
                    backgroundColor: selectedTeamMembers.includes(member.name)
                      ? "#3498db"
                      : "#f1f1f1",
                    color: "#000",
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
            <label>Available Dates</label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "5px",
              }}
            >
              {availableDates.map((date) => (
                <button
                  key={date}
                  onClick={() => toggleMeetingDateSelection(date)}
                  style={{
                    padding: "8px",
                    backgroundColor: selectedMeetingDate.includes(date)
                      ? "#3498db"
                      : "#f1f1f1",
                    color: "#000",
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
            Submit
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
