import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FlightItems from "./FlightItems";

const FlightResults = ({ flights }) => {
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [selectedSortType, setSelectedSortType] = useState("Giá thấp nhất");
    const [selectedFilter, setSelectedFilter] = useState("Tất cả");
    const [displayedFlights, setDisplayedFlights] = useState([...flights]);
    const [itemsToShow, setItemsToShow] = useState(5);

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
    const filterOptions = ["Tất cả", "Vietnam Airlines", "VietJet Air", "Bamboo Airways", "Vietravel Airlines"];

    const handleSortChange = (type) => {
        setSelectedSortType(type);
        const sortedFlights = [...displayedFlights];
        if (type === "Giá thấp nhất") {
            sortedFlights.sort((a, b) => a.Price - b.Price);
        } else if (type === "Giá cao nhất") {
            sortedFlights.sort((a, b) => b.Price - a.Price);
        } else if (type === "Cất cánh sớm nhất") {
            sortedFlights.sort((a, b) => a.DepartureTime.localeCompare(b.DepartureTime));
        } else if (type === "Cất cánh muộn nhất") {
            sortedFlights.sort((a, b) => b.DepartureTime.localeCompare(a.DepartureTime));
        } else if (type === "Hạ cánh sớm nhất") {
            sortedFlights.sort((a, b) => a.ArrivalTime.localeCompare(b.ArrivalTime));
        } else if (type === "Hạ cánh muộn nhất") {
            sortedFlights.sort((a, b) => b.ArrivalTime.localeCompare(a.ArrivalTime));
        }
        setDisplayedFlights(sortedFlights);
        setShowSortDropdown(false);
    };

    const handleFilterChange = (type) => {
        setSelectedFilter(type);
        const filteredFlights =
            type === "Tất cả"
                ? flights
                : flights.filter((flight) => flight.Name === type);
        setDisplayedFlights(filteredFlights);
    };

    const handleShowMore = () => {
        setItemsToShow(itemsToShow + 5);
    };

    useEffect(() => {
        // Apply filter and then sort on component load or when flights change
        handleFilterChange(selectedFilter);
    }, [flights]);

    return (
        <div className="container d-flex flex-row mt-5 justify-content-between">
        <div className="container d-flex flex-column col-3 mb-3">
                {/* Sort Section */}
                <div className="container mb-3">
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
                                className={`bi bi-chevron-${showSortDropdown ? "up" : "down"} text-primary`}
                                ></i>
                        </div>
                        </div>
                        {showSortDropdown && (
                        <div className="bg-white rounded shadow mt-1">
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
                {/* Filter Section */}
                <div className="container mb-3">
                        <div className="bg-white rounded shadow p-3">
                        <div className="fw-bold mb-2">Lọc kết quả</div>
                        <label className="form-label">Hãng hàng không</label>
                        <select
                                className="form-select"
                                value={selectedFilter}
                                onChange={(e) => handleFilterChange(e.target.value)}
                        >
                                {filterOptions.map((option, index) => (
                                <option key={index} value={option}>
                                        {option}
                                </option>
                                ))}
                        </select>
                        </div>
                </div>
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
                <FlightItems
                    flights={displayedFlights.slice(0, itemsToShow)}
                    passengers={searchParams.get("passengerCount")}
                />
                {itemsToShow < displayedFlights.length && (
                    <button className="btn btn-primary d-block mx-auto" onClick={handleShowMore}>
                        Show more
                    </button>
                )}
        </div>
    </div>
    );
};

export default FlightResults;
