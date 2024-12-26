import React, { useState, useRef, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom"; // If using React Router
import HotelItems from "./HotelItems";
import {fetchHotels} from "../services.js";


const HotelResults = ({hotels,formData, url}) => {
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [selectedSortType, setSelectedSortType] = useState("Giá tăng dần");
    const [showStarDropdown, setShowStarDropdown] = useState(false);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [hotels_, setHotels] = useState([]);
    const offsetRef = useRef(0);
    const limit = 5;
    // const [formData, setFormData] = useState({});
  
    const sortOptions = [
      "Giá tăng dần",
      "Giá giảm dần",
    ];
    const ratings = [
        { stars: 1},
        { stars: 2},
        { stars: 3},
        { stars: 4},
        { stars: 5},
      ];
  
    const handleSortChange = (type) => {
        setSelectedSortType(type);
        setShowSortDropdown(false);
        // Sort hotels based on the selectedSortType
        const sortedHotels = hotels_.sort((a, b) => {
            if (type === 'Giá giảm dần') {
                return b.Price - a.Price; // Sort by price descending
            }
            if (type === 'Giá tăng dần') {
                return a.Price - b.Price; // Sort by price ascending
            }
            return 0; // No sorting, return as is
        });
        setHotels(sortedHotels);
    };
    const toggleRating = (stars) => {
        if (selectedRatings.includes(stars)) {
          setSelectedRatings(selectedRatings.filter((rating) => rating !== stars));
        } else {
          setSelectedRatings([...selectedRatings, stars]);
        }
    };
    const loadMoreHotel = () => {
        const fetchData = async () => {
            const result = await fetchHotels(url, offsetRef.current, limit, selectedSortType);
            offsetRef.current += result.hotels.length;
            // setHotels(hotels_ => [...hotels_, ...result.hotels]);
            const temp = [...hotels_, ...result.hotels];
            offsetRef.current += result.hotels.length;
            const sortedHotels = temp.sort((a, b) => {
                if (selectedSortType === 'Giá giảm dần') {
                    return b.Price - a.Price; // Sort by price descending
                }
                if (selectedSortType === 'Giá tăng dần') {
                    return a.Price - b.Price; // Sort by price ascending
                }
                return 0; // No sorting, return as is
            });
            setHotels(sortedHotels);
        };
        fetchData();
    };
    useEffect(()=>{
        setSelectedSortType("Giá tăng dần");
        const fetchData = async () => {
            const result = await fetchHotels(url, 0, 5, selectedSortType);
            // setHotels(result.hotels);
            offsetRef.current = result.hotels.length;
            const sortedHotels = result.hotels.sort((a, b) => {
                if (selectedSortType === 'Giá giảm dần') {
                    return b.Price - a.Price; // Sort by price descending
                }
                if (selectedSortType === 'Giá tăng dần') {
                    return a.Price - b.Price; // Sort by price ascending
                }
                return 0; // No sorting, return as is
            });
            setHotels(sortedHotels);
        };
        fetchData();
        // setHotels(hotels);
    },[]);
  
    return (
        <div className="container d-flex flex-row mt-5 justify-content-between">
            {/* Sort Section */}
            <div className="col-3 mb-3">
                <div
                    className="justify-content-between align-items-center p-3 bg-white rounded shadow mb-3"
                >
                    <div>
                        <div className="fw-bold">Khoảng giá</div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Min"
                                style={{ width: "110px" }}
                            />
                        </div>
                        <div className="col-auto d-flex align-items-center">
                            <div
                                style={{
                                    width: "20px",
                                    height: "2px",
                                    backgroundColor: "#ccc",
                                }}
                            ></div>
                        </div>
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Max"
                                style={{ width: "110px" }}
                            />
                        </div>
                    </div>
                    <div className="col d-flex justify-content-end mt-3">
                            <button
                            className="btn btn-secondary text-white mb-1 me-2"
                            style={{ fontSize: "0.9rem", width: "100px"}}
                            >
                                Áp dụng
                            </button>
                            <button
                            className="btn btn-secondary text-white mb-1"
                            style={{ fontSize: "0.9rem", width: "100px"}}
                            >
                                Reset
                            </button> 
                    </div>
                </div>
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
                            </div>
                            </div>
                        ))}
                        <div className="col d-flex justify-content-end"
                        style={{paddingRight: "5px"}}>
                            <button
                            className="btn btn-secondary text-white mb-1"
                            style={{ fontSize: "0.9rem", width: "100px"}}
                            >
                                Áp dụng
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="col-8 container d-flex flex-column">
                {/* Search Info */}
                <div className="bg-white rounded shadow p-3 d-flex justify-content-between align-items-start mb-3">
                    <div>
                    <div className="d-flex align-items-center">
                        <div className="fw-bold"></div> {formData.location || "N/A"}
                    </div>
                    <div className="text-muted">
                    </div> {formData.checkInDate + " - " + formData.checkOutDate + " • " + formData.passengerCount + " người, " + formData.roomCount + " phòng"|| "N/A"}
                    </div>
                    <a href="/hotel/search" className="btn btn-secondary text-white">
                    <i className="bi bi-search"></i> Đổi tìm kiếm
                    </a>
                </div>
    
                {/* hotel Items */}
                <HotelItems hotels={hotels_} formData={formData} />
    
                {/* Loading Block */}
                <div className="text-center my-3">
                    <div className="fw-bold text-primary">Đang tìm kiếm khách sạn</div>
                    <div className="my-2">
                    <img src="/path/to/loading.gif" alt="Loading" width="50" />
                    </div>
                </div>
    
                {/* Show More Button */}
                <button className="btn btn-primary d-block mx-auto" onClick={loadMoreHotel}>Show more</button>
            </div>
        </div>
    );
  };
  
  export default HotelResults;
  