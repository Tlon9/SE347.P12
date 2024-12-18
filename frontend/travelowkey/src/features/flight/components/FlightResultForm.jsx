import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FlightItems from "./FlightItems";

const FlightResults = ({flights}) => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedSortType, setSelectedSortType] = useState("Giá thấp nhất");

  const sortOptions = [
    "Giá thấp nhất",
    "Giá cao nhất",
    "Cất cánh sớm nhất",
    "Cất cánh muộn nhất",
    "Hạ cánh sớm nhất",
    "Hạ cánh muộn nhất",
  ];

  const handleSortChange = (type) => {
    setSelectedSortType(type);
    setShowSortDropdown(false);
  };

  return (
    <div className="container d-flex flex-row mt-5 justify-content-between">
      {/* Sort Section */}
        <div className="col-3 mb-3">
            <div
            className="d-flex justify-content-between align-items-center p-3 bg-white rounded shadow"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            >
            <div>
                <div className="fw-bold">Sắp xếp</div>
                <div>{selectedSortType}</div>
            </div>
            <div>
                <i
                className={`bi bi-chevron-${
                    showSortDropdown ? "up" : "down"
                } text-primary`}
                ></i>
            </div>
            </div>
            {showSortDropdown && (
            <div className="bg-white rounded shadow-sm mt-1">
                {sortOptions.map((option, index) => (
                <div
                    key={index}
                    className={`d-flex align-items-center p-2 ${
                    selectedSortType === option ? "bg-light" : ""
                    }`}
                    onClick={() => handleSortChange(option)}
                    style={{ cursor: "pointer" }}
                >
                    <i
                    className={`bi ${
                        selectedSortType === option
                        ? "bi-circle-fill text-primary"
                        : "bi-circle text-secondary"
                    } me-2`}
                    ></i>
                    <div>{option}</div>
                </div>
                ))}
            </div>
            )}
        </div>
        <div className="col-8 container d-flex flex-column">
            {/* Search Info */}
            <div className="bg-white rounded shadow p-3 d-flex justify-content-between align-items-start mb-3">
                <div>
                <div className="d-flex align-items-center">
                    <div className="fw-bold">TP HCM (SGN)</div>
                    <i className="bi bi-arrow-right mx-2"></i>
                    <div className="fw-bold">TOKYO (TYOA)</div>
                </div>
                <div className="text-muted">
                    15, tháng 10, 2023 • 1 hành khách • Phổ thông
                </div>
                </div>
                <a href="/flight/search" className="btn btn-secondary text-white">
                <i className="bi bi-search"></i> Đổi tìm kiếm
                </a>
            </div>

            {/* Flight Items */}
            <FlightItems flights={flights} />

            {/* Loading Block */}
            <div className="text-center my-3">
                <div className="fw-bold text-primary">Đang tìm kiếm chuyến bay</div>
                <div className="my-2">
                <img src="/path/to/loading.gif" alt="Loading" width="50" />
                </div>
            </div>

            {/* Show More Button */}
            <button className="btn btn-primary d-block mx-auto">Show more</button>
        </div>
    </div>
  );
};

export default FlightResults;
