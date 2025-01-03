import React, { useState } from "react";
import FlightSearch from "../features/flight/components/FlightSearchForm";
import HotelSearch from "../features/hotel/components/HotelSearchForm";

const FeatureNavbar = () => {
  const [selectedFeature, setSelectedFeature] = useState("flight");

  const features = [
    { type: "flight", icon: "bi-airplane-fill", text: "Vé máy bay", color: "#236eff" },
    { type: "hotel", icon: "bi-building-fill", text: "Khách sạn", color: "#04389f" },
    { type: "bus", icon: "bi-bus-front-fill", text: "Vé xe khách", color: "#c41f85" },
    { type: "transfer", icon: "bi-car-front-fill", text: "Xe dịch vụ", color: "#22bbbb" },
  ];

  const featureContents = {
    flight: <FlightSearch/>,
    bus: <div className="p-4 text-light">Content for Bus</div>,
    transfer: <div className="p-4 text-light">Content for Transfer</div>,
    hotel: <HotelSearch/>,
  };

  return (
    <div>
      {/* Navbar */}
      <div className="d-flex align-items-center gap-3">
        {features.map((feature) => (
          <div
            key={feature.type}
            className={`d-flex flex-shrink-0 align-items-center gap-2 px-3 py-2 ${
              selectedFeature === feature.type ? "bg-white rounded" : ""
            }`}
            style={{
              width: "12rem",
              height: "4rem",
              cursor: "pointer",
              backgroundColor: selectedFeature === feature.type ? "" : "transparent",
            }}
            onClick={() => setSelectedFeature(feature.type)}
          >
            <i
              className={`${feature.icon}`}
              style={{
                fontSize: "2rem",
                color: selectedFeature === feature.type ? feature.color : "#fff",
              }}
            ></i>
            <div
              className="text-center fw-bold"
              style={{
                flex: "1 0 0",
                height: "1.5rem",
                fontSize: "1rem",
                color: selectedFeature === feature.type ? "#000" : "#fff",
              }}
            >
              {feature.text}
            </div>
          </div>
        ))}
      </div>
      <svg class="container-fluid divine-line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1152 2" fill="none">
            <path d="M0 1H1152" stroke="white" stroke-width="2" />
      </svg>
      {/* Feature Content */}
      <div className="mt-1">
        {Object.entries(featureContents).map(([type, content]) => (
          <div
            key={type}
            className={selectedFeature === type ? "show" : "hide"}
            style={{
              display: selectedFeature === type ? "block" : "none",
            }}
          >
            {content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureNavbar;