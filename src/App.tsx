import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StartPage from "./interfaces/StartPage";
import EventPage from "./interfaces/EventPage";
import MeetingDetailsPage from "./interfaces/MeetingDetailsPage";
import Login from "./assets/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/details/:date" element={<MeetingDetailsPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
