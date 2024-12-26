// src/router/index.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import FlightSearchScreen from "../features/flight/pages/FlightSearch";
import FlightResult from "../features/flight/pages/FlightResult";
import HotelSearchScreen from "../features/hotel/pages/HotelSearch";
import HotelResult from "../features/hotel/pages/HotelResult";
import RoomResult from "../features/hotel/pages/RoomResult";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flight/search" element={<FlightSearchScreen />} />
        <Route path="/flight/result" element={<FlightResult />} />
        <Route path="/hotel/search" element={<HotelSearchScreen />} />
        <Route path="/hotel/result" element={<HotelResult />} />
        <Route path="/room/result" element={<RoomResult />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
