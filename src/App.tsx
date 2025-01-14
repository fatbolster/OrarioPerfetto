import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StartPage from "./interfaces/StartPage";
import EventPage from "./interfaces/EventPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/event" element={<EventPage />} />
      </Routes>
    </Router>
  );
};

export default App;
