// src/router/index.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import FlightSearchScreen from "../features/flight/pages/FlightSearch";
import FlightResult from "../features/flight/pages/FlightResult";
import HotelSearch from "../features/hotel/pages/HotelSearch";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flight/search" element={<FlightSearchScreen />} />
        <Route path="/flight/result" element={<FlightResult />} />
        <Route path="/hotels" element={<HotelSearch />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
