import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FlightItems from "./FlightItems";

const FlightResults = ({flights}) => {
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [selectedSortType, setSelectedSortType] = useState("Giá thấp nhất");
    const [itemsToShow, setItemsToShow] = useState(5); // State to keep track of items to show
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);

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
        if (type === "Giá thấp nhất") {
                flights.sort((a, b) => a.Price - b.Price);
        } else if (type === "Giá cao nhất") {
                flights.sort((a, b) => b.Price - a.Price);
        } else if (type === "Cất cánh sớm nhất") {
                flights.sort((a, b) => a.DepartureTime.localeCompare(b.DepartureTime));
        } else if (type === "Cất cánh muộn nhất") {
                flights.sort((a, b) => b.DepartureTime.localeCompare(a.DepartureTime));
        } else if (type === "Hạ cánh sớm nhất") {
                flights.sort((a, b) => a.ArrivalTime.localeCompare(b.ArrivalTime));
        } else if (type === "Hạ cánh muộn nhất") {
                flights.sort((a, b) => b.ArrivalTime.localeCompare(a.ArrivalTime));
        }
        setShowSortDropdown(false);
    };

    const handleShowMore = () => {
        setItemsToShow(itemsToShow + 5); // Increase the number of items to show by 5
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
                                                : "bi-circle text-primary"
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
                                                <div className="fw-bold">{searchParams.get("from")}</div>
                                                <i className="bi bi-arrow-right mx-2"></i>
                                                <div className="fw-bold">{searchParams.get("to")}</div>
                                        </div>
                                        <div className="text-muted">
                                                {searchParams.get("date").split('-')[2]}, tháng {searchParams.get("date").split('-')[1]}, {searchParams.get("date").split('-')[0]} • {searchParams.get("passengerCount")} hành khách • {searchParams.get("seatType")}
                                        </div>
                                </div>
                                <a href="/flight/search" className="btn btn-secondary text-white">
                                        <i className="bi bi-search"></i> Đổi tìm kiếm
                                </a>
                        </div>

                        {/* Flight Items */}
                        <FlightItems flights={flights.slice(0, itemsToShow)} passengers={searchParams.get("passengerCount")} />
                        {/* Show More Button */}
                        {itemsToShow < flights.length && (
                            <button className="btn btn-primary d-block mx-auto" onClick={handleShowMore}>
                                Show more
                            </button>
                        )}
                </div>
        </div>
    );
};

export default FlightResults;
