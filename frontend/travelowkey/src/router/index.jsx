// src/router/index.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import FlightSearchScreen from "../features/flight/pages/FlightSearch";
import FlightResult from "../features/flight/pages/FlightResult";
import HotelSearchScreen from "../features/hotel/pages/HotelSearch";
import HotelResult from "../features/hotel/pages/HotelResult";
import RoomResult from "../features/hotel/pages/RoomResult";
import FlightPaymentScreen from "../features/payment/pages/FlightPayment";
import HotelPaymentScreen from "../features/payment/pages/HotelPayment";
import InvoiceScreen from "../features/payment/pages/Invoice";
import HistoryPage from  "../features/payment/pages/History";
import LoginScreen from "../features/user/pages/Login"
import SignUpScreen from "../features/user/pages/SignUp"

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
        <Route path="/payment/flight" element={<FlightPaymentScreen />} />
        <Route path="/payment/hotel" element={<HotelPaymentScreen />} />
        <Route path="/invoice" element={<InvoiceScreen />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/user/login" element={<LoginScreen />} />
        <Route path="/user/signup" element={<SignUpScreen />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
