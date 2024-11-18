// src/router/index.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import FlightSearch from "../features/flight/pages/FlightSearch";
import HotelSearch from "../features/hotel/pages/HotelSearch";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flights" element={<FlightSearch />} />
        <Route path="/hotels" element={<HotelSearch />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
