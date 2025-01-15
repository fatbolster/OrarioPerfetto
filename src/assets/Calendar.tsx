import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { fetchWithAuth } from "../api"; // Your utility function for authenticated requests
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

const MyCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [unavailableDates, setUnavailableDates] = useState<string[]>([]);
  const [meetingData, setMeetingData] = useState<Record<string, any>>({});
  const navigate = useNavigate();

  // Fetch unavailable dates and meeting data on component mount
  useEffect(() => {
    const getUnavailableDates = async () => {
      try {
        const response = await fetchWithAuth("/api/calendar/unavailable-dates");
        const data = await response.json();
        console.log("Fetched unavailable dates:", data.unavailableDates);
        setUnavailableDates(data.unavailableDates); // Update state
      } catch (error) {
        console.error("Error fetching unavailable dates:", error);
      }
    };

    getUnavailableDates();
  }, []);

  // Toggle unavailable dates
  const handleDateToggle = async (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0];

    // Update state optimistically
    setUnavailableDates((prevDates) =>
      prevDates.includes(formattedDate)
        ? prevDates.filter((d) => d !== formattedDate)
        : [...prevDates, formattedDate]
    );

    try {
      // Save updated unavailable date to backend
      await fetchWithAuth("/api/calendar/add-date", {
        method: "POST",
        body: JSON.stringify({ date: formattedDate }),
      });
      console.log("Date saved successfully");
    } catch (error) {
      console.error("Error saving unavailable date:", error);
    }
  };

  // Handle clicking on a date
  const handleDateClick = (value: Date | null) => {
    if (value instanceof Date) {
      const formattedDate = value.toISOString().split("T")[0];
      setSelectedDate(value);

      if (meetingData[formattedDate]) {
        navigate(`/details/${formattedDate}`); // Navigate to meeting details page
      } else {
        alert("No meeting data available for this date.");
      }
    }
  };

  // Highlight unavailable dates and meeting dates
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const formattedDate = date.toISOString().split("T")[0];
      console.log(
        `Checking ${formattedDate} against unavailable dates:`,
        unavailableDates
      );

      if (unavailableDates.includes(formattedDate)) {
        return "unavailable-date"; // Apply this class for unavailable dates
      }
      return ""; // Default: no class
    }
    return ""; // For views other than "month"
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
          onClickDay={(value) => handleDateToggle(value)} // Toggle unavailable dates on click
          value={selectedDate}
          tileClassName={tileClassName} // Highlight unavailable and meeting dates
          selectRange={false}
          className="custom-calendar"
          showNavigation={true}
          showNeighboringMonth={false}
        />
      </div>
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
