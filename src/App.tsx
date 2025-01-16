import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import StartPage from "./interfaces/StartPage";
import EventPage from "./interfaces/EventPage";
import MeetingDetailsPage from "./interfaces/MeetingDetailsPage";
import Login from "./assets/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root "/" to "/login" */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<StartPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/details/:date" element={<MeetingDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
