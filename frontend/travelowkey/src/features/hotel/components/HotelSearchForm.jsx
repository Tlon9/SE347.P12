import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getToday, fetchAreas} from "../services.js";
// import './hotel-search.css';

const HotelSearch = ({searchPage}) => {
    const [hotelSearchInfo, setHotelSearchInfo] = useState({
        location: '',
        checkinDate: '',
        checkoutDate: '',
    });
    const [passengerInfo, setPassengerInfo] = useState({
        adult: 1,
        child: 0,
        numberOfRoom: 0,
      });
    const [today, setToday] = useState("");

    const [locations, setLocations] = useState({ areas: []});
    const [recommendations, setRecommendations] = useState({});

    useEffect(() => {
        const initializeForm = async () => {
          // Set today's date
            const currentDate = getToday();
            setToday(currentDate);
            setHotelSearchInfo((prev) => ({ ...prev, checkinDate: currentDate }));
            setHotelSearchInfo((prev) => ({ ...prev, checkoutDate: currentDate }));
            // Fetch locations
            try {
                const data = await fetchAreas();
                setLocations({ areas: data.areas || [] });
                // setHotelSearchInfo(prev => ({ ...prev, location: data.areas }));
            } catch (error) {
                console.error("Error initializing form:", error);
            }
        };
    
        initializeForm();
      }, []);

    const handlePassengerChange = (type, operation, event) => {
        setPassengerInfo((prev) => ({
          ...prev,
          [type]:
            operation === "increase"
              ? Math.min(prev[type] + 1, 9)
              : Math.max(prev[type] - 1, type === "adult" ? 1 : 0),
        }));
        event.stopPropagation();
      };

    const handleGuestChange = (type, increment) => {
        setHotelSearchInfo(prev => {
            const newValue = increment
                ? prev[type] + 1
                : Math.max(type === 'adultQuantity' ? 1 : 0, prev[type] - 1);
            return { ...prev, [type]: newValue };
        });
    };

    const handleSubmit = () => {
        const { location, checkinDate, checkoutDate } = hotelSearchInfo;
        if (!location) return alert('Địa điểm không được để trống');
        if (!checkinDate || !checkoutDate) return alert('Ngày đặt phòng không được để trống');
        if (new Date(checkinDate) >= new Date(checkoutDate)) return alert('Ngày nhận phòng không thể cùng sau ngày trả phòng');

        sessionStorage.setItem('HotelSearchInfo', JSON.stringify(hotelSearchInfo));
        const passengerCount = passengerInfo.adult + passengerInfo.child;
        const roomCount = passengerInfo.numberOfRoom
        const checkInDate = hotelSearchInfo.checkinDate.split('-').reverse().join('-');
        const checkOutDate = hotelSearchInfo.checkoutDate.split('-').reverse().join('-');
        window.location.href = `/hotel/result?location=${location}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomCount=${roomCount}&passengerCount=${passengerCount}`;
    };

    // const handleSubmit = () => {
    //     const { departure, destination, departureDate } = formData;
    
    //     if (!departure || !destination) {
    //       alert("Both departure and destination are required.");
    //       return;
    //     }
    //     if (departure === destination) {
    //       alert("Departure and destination must be different.");
    //       return;
    //     }
    //     const passengerCount = passengerInfo.adult + passengerInfo.child + passengerInfo.baby;
    //     // const departureDate = formData.departureDate.split('-').reverse().join('-');
    //     // console.log("Submitting:", {
    //     //   departure,
    //     //   destination,
    //     //   departureDate,
    //     //   seatType,
    //     //   passengerCount,
    //     // });
    
    //     // Redirect logic here
    //     window.location.href = `/flight/result?from=${departure}&to=${destination}&date=${departureDate}&seatType=${seatType}&passengerCount=${passengerCount}`;
    //   };

    // const today = new Date().toISOString().split('T')[0];

    return (
        <div className="container py-3 rounded">
            <div className={`container-fluid rounded ${searchPage ? "bg-primary" : ""}`}>
                <div className={`d-flex gap-3 mb-3 ${searchPage ? "text-dark" : "text-light"}`}>
                    {/* Passenger Dropdown */}
                    <div className="dropdown">
                        <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        style={{ opacity: 0.9, }}>
                        <i class="bi bi-people-fill px-2"></i>
                        {`${passengerInfo.adult} Người lớn, ${passengerInfo.child} trẻ em, ${passengerInfo.numberOfRoom} phòng`}
                        </button>
                        <ul className="dropdown-menu">
                            {["adult", "child", "numberOfRoom"].map((type) => (
                                <li key={type} className="d-flex align-items-center p-2">
                                <div className="me-auto fw-normal p-2">
                                    {type === "adult" ? "Người lớn" : type === "child" ? "Trẻ em" : "Số phòng"}
                                </div>
                                <div className="me-auto fw-light fs-6 p-2">
                                    {type === "adult" ? "(Từ 12 tuổi)" : type ==="child" ? "(Từ 2-11 tuổi)" : ""}
                                </div>
                                <button
                                    className="btn btn-sm btn-outline-primary btn-circle"
                                    onClick={() => handlePassengerChange(type, "decrease")}
                                >
                                    -
                                </button>
                                <span className="mx-2">{passengerInfo[type]}</span>
                                <button
                                    className="btn btn-sm btn-outline-primary btn-circle"
                                    onClick={(e) => handlePassengerChange(type, "increase", e)}
                                >
                                    +
                                </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between row g-3 rounded">
                <div className="col-md-4">
                        <label htmlFor="hotelLocation" className={`form-label ${searchPage ? "text-dark" : "text-light"} fw-bold`}>Thành phố, địa điểm hoặc tên khách sạn</label>
                        <input
                            id="hotelLocation"
                            className="form-control"
                            type="text"
                            placeholder="Địa điểm"
                            value={hotelSearchInfo.location}
                            onChange={e => setHotelSearchInfo({ ...hotelSearchInfo, location: e.target.value })}
                            list="locationList"
                        />
                        <datalist id="locationList">
                            {locations.areas.map((loc, index) => (
                                <option key={index} value={loc} />
                            ))}
                        </datalist>
                </div>

                <div className="col-md-3">
                    <label htmlFor="checkinDate" className={`form-label ${searchPage ? "text-dark" : "text-light"} fw-bold`}>Ngày nhận phòng</label>
                    <div className="input-group">
                        <div className="input-group-text text-primary">
                        <i className="bi bi-calendar"></i>
                        </div>
                        <input
                            id="checkinDate"
                            className="form-control"
                            type="date"
                            value={hotelSearchInfo.checkinDate}
                            min={today}
                            onChange={(e) =>
                                setHotelSearchInfo((prev) => ({ ...prev, checkinDate: e.target.value }))
                            }
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="checkoutDate" className={`form-label ${searchPage ? "text-dark" : "text-light"} fw-bold`}>Ngày trả phòng</label>
                    <div className="input-group">
                        <div className="input-group-text text-primary">
                            <i className="bi bi-calendar"></i>
                        </div>
                        <input
                            id="checkoutDate"
                            className="form-control"
                            type="date"
                            value={hotelSearchInfo.checkoutDate}
                            min={today}
                            onChange={(e) =>
                                setHotelSearchInfo((prev) => ({ ...prev, checkoutDate: e.target.value }))
                            }
                        />
                    </div>
                </div>
                <div className="col-md">
                    <label className="form-label text-light fw-bold d-block">&nbsp;</label>
                    <button className="btn btn-secondary text-white" onClick={handleSubmit}>
                        <i className="bi bi-search"> </i> 
                        Tìm khách sạn
                    </button>
                </div>
            </div>

            {/* <div className="row mb-4">
                <div className="col">
                    <label className={`form-label ${searchPage ? "text-dark" : "text-light"} fw-bold`}>Người lớn</label>
                    <div className="input-group">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => handleGuestChange('adultQuantity', false)}
                        >
                            -
                        </button>
                        <input
                            className="form-control text-center"
                            type="text"
                            readOnly
                            value={hotelSearchInfo.adultQuantity}
                        />
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => handleGuestChange('adultQuantity', true)}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className="col">
                    <label className={`form-label ${searchPage ? "text-dark" : "text-light"} fw-bold`}>Trẻ em</label>
                    <div className="input-group">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => handleGuestChange('childQuantity', false)}
                        >
                            -
                        </button>
                        <input
                            className="form-control text-center"
                            type="text"
                            readOnly
                            value={hotelSearchInfo.childQuantity}
                        />
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => handleGuestChange('childQuantity', true)}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div> */}


            {/* <div className="row mt-5">
                <h5 className="text-center">Điểm đến hot nhất do Travelowkey đề xuất</h5>
                <div className="d-flex justify-content-center">
                    {Object.entries(recommendations).map(([key, value]) => (
                        <div
                            key={key}
                            className="card mx-2"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setHotelSearchInfo({ ...hotelSearchInfo, location: key })}
                        >
                            <div className="card-body">
                                <h6 className="card-title">{key}</h6>
                                <p className="card-text">Có {value} khách sạn</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
        </div>
    );
};

export default HotelSearch;
