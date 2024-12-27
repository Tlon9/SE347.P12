import React, { useState, useRef } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom"; // If using React Router
import RoomItems from "./RoomItem";
// import {fetchRooms} from "../services.js";


const RoomResults = ({rooms,formData}) => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [selectedSortType, setSelectedSortType] = useState("Giá thấp nhất");
    const [showStarDropdown, setShowStarDropdown] = useState(false);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [rooms_, setRooms] = useState([]);
    const offsetRef = useRef(0);
    const limit = 5;
    // const [formData, setFormData] = useState({});
  
    const sortOptions = [
      "Giá thấp nhất",
      "Giá cao nhất",
    ];
    const ratings = [
        { stars: 1, count: 229 },
        { stars: 2, count: 324 },
        { stars: 3, count: 607 },
        { stars: 4, count: 178 },
        { stars: 5, count: 45 },
      ];
  
    const handleSortChange = (type) => {
      setSelectedSortType(type);
      setShowSortDropdown(false);
    };
    const toggleRating = (stars) => {
        if (selectedRatings.includes(stars)) {
          setSelectedRatings(selectedRatings.filter((rating) => rating !== stars));
        } else {
          setSelectedRatings([...selectedRatings, stars]);
        }
    };
    // const loadMoreRoom = async () => {
    //     const result = await fetchRooms(url, offsetRef.current, limit);
    //     offsetRef.current += limit;
    //     setRooms(result.rooms);
    // };
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
                <div
                    className="d-flex justify-content-between align-items-center p-3 bg-white rounded shadow mt-3"
                    onClick={() => setShowStarDropdown(!showStarDropdown)}
                    style={{ cursor: "pointer" }}
                >
                    <div>
                    <div className="fw-bold">Đánh giá sao</div>
                    <div>
                        {selectedRatings.length > 0
                        ? selectedRatings
                            .sort((a, b) => a - b)
                            .join(", ") + " sao"
                        : "Chọn đánh giá"}
                    </div>
                    </div>
                    <div>
                    <i
                        className={`bi bi-chevron-${
                        showStarDropdown ? "up" : "down"
                        } text-primary`}
                    ></i>
                    </div>
                </div>
                {showStarDropdown && (
                    <div className="bg-white rounded shadow-sm mt-1">
                    {ratings.map((rating, index) => (
                        <div
                        key={index}
                        className="d-flex align-items-center p-2"
                        onClick={() => toggleRating(rating.stars)}
                        style={{ cursor: "pointer" }}
                        >
                        <input
                            type="checkbox"
                            checked={selectedRatings.includes(rating.stars)}
                            onChange={() => toggleRating(rating.stars)}
                            className="form-check-input me-2"
                        />
                        <div className="d-flex align-items-center">
                            <span className="me-1">{rating.stars}</span>
                            <i
                            className="bi bi-star-fill text-warning"
                            style={{ fontSize: "16px" }}
                            ></i>
                            <span className="ms-2 text-muted" style={{ fontSize: "14px" }}>
                            ({rating.count})
                            </span>
                        </div>
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
                        <div className="fw-bold"></div> {formData.name ||"N/A"}
                    </div>
                    <div className="text-muted">
                    </div> {formData.checkInDate + " - " + formData.checkOutDate + " • " + formData.passengerCount + " người, " + formData.roomCount + " phòng"|| "N/A"}
                    </div>
                    <a href="/room/search" className="btn btn-secondary text-white">
                    <i className="bi bi-search"></i> Đổi tìm kiếm
                    </a>
                </div>
    
                {/* room Items */}
                <RoomItems hotel={searchParams.get("hotelName")} rooms={rooms} passengers={searchParams.get("passengerCount")} checkInDate={formData.checkInDate} checkOutDate={formData.checkOutDate}/>
    
                {/* Loading Block */}
                <div className="text-center my-3">
                    <div className="fw-bold text-primary">Đang tìm kiếm phòng</div>
                    <div className="my-2">
                    {/* <img src="/path/to/loading.gif" alt="Loading" width="50" /> */}
                    </div>
                </div>
    
                {/* Show More Button */}
                {/* <button className="btn btn-primary d-block mx-auto" onClick={loadMoreRoom}>Show more</button> */}
            </div>
        </div>
    );
  };
  
  export default RoomResults;
  