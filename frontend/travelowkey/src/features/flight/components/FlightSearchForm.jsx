import React, { useState, useEffect } from "react";
import {getToday, fetchLocations} from "../services.js";
const FlightSearch = ({searchPage}) => {
  const [today, setToday] = useState("");
  const [passengerInfo, setPassengerInfo] = useState({
    adult: 1,
    child: 0,
    baby: 0,
  });
  const [seatType, setSeatType] = useState("");
  const [seatTypeList, setSeatTypeList] = useState([]);
  const [locations, setLocations] = useState({ from: [], to: [] });
  const [formData, setFormData] = useState({
    departure: "",
    destination: "",
    departureDate: "",
  });

  useEffect(() => {
    const initializeForm = async () => {
      // Set today's date
      const currentDate = getToday();
      setToday(currentDate);
      setFormData((prev) => ({ ...prev, departureDate: currentDate }));
      // Fetch locations
      try {
        const data = await fetchLocations();
        setLocations({ from: data.departures || [], to: data.destinations || [] });
        setSeatType(data.seatClasses[0]);
        setSeatTypeList(data.seatClasses);
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

  const handleSubmit = () => {
    const { departure, destination, departureDate } = formData;

    if (!departure || !destination) {
      alert("Both departure and destination are required.");
      return;
    }
    if (departure === destination) {
      alert("Departure and destination must be different.");
      return;
    }
    const passengerCount = passengerInfo.adult + passengerInfo.child + passengerInfo.baby;
    // const departureDate = formData.departureDate.split('-').reverse().join('-');
    // console.log("Submitting:", {
    //   departure,
    //   destination,
    //   departureDate,
    //   seatType,
    //   passengerCount,
    // });

    // Redirect logic here
    window.location.href = `/flight/result?from=${departure}&to=${destination}&date=${departureDate}&seatType=${seatType}&passengerCount=${passengerCount}`;
  };

  return (
    <div className="container-fluid py-3">
      <div className={`container-fluid ${searchPage ? "bg-primary" : ""}`}>
        <div className={`d-flex gap-3 mb-3 ${searchPage ? "text-dark" : "text-light"}`}>
          {/* Passenger Dropdown */}
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              style={{ opacity: 0.9, }}>
              <i class="bi bi-people-fill px-2"></i>
              {`${passengerInfo.adult} Người lớn, ${passengerInfo.child} trẻ em, ${passengerInfo.baby} em bé`}
            </button>
            <ul className="dropdown-menu">
              {["adult", "child", "baby"].map((type) => (
                <li key={type} className="d-flex align-items-center p-2">
                  <div className="me-auto fw-normal p-2">
                    {type === "adult" ? "Người lớn" : type === "child" ? "Trẻ em" : "Em bé"}
                  </div>
                  <div className="me-auto fw-light fs-6 p-2">
                    {type === "adult" ? "(Từ 12 tuổi)" : type ==="child" ? "(Từ 2-11 tuổi)" : "(Dưới 2 tuổi)"}
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

          {/* Seat Type Dropdown */}
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              style={{ opacity: 0.9 }}
            >
              <i class="bi bi-star-fill px-2"></i>
              {seatType === "" ? "Phổ thông" : seatType }
            </button>
            <ul className="dropdown-menu">
              {seatTypeList.map((type) => (
                <li
                  key={type}
                  className={`dropdown-item ${seatType === type ? "active" : ""}`}
                  onClick={() => setSeatType(type)}
                >
                  {type}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Flight Search Form */}
      <form className="d-flex justify-content-between row g-3">
        <div className="col-md-4">
          <label htmlFor="departure" className={`form-label ${searchPage ? "text-dark" : "text-light"} fw-bold`}>
            Từ
          </label>
          <div className="input-group">
            <div className="input-group-text text-primary">
              <i className="bi bi-geo-alt-fill"></i>
            </div>
            <input
              id="departure"
              className="form-control"
              placeholder="Điểm đi"
              value={formData.departure}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, departure: e.target.value }))
              }
              list="departureLocations"
            />
          </div>
          <datalist id="departureLocations">
            {locations.from.map((loc, idx) => (
              <option key={idx} value={loc} />
            ))}
          </datalist>
        </div>
        <div className="col-md-4">
          <label htmlFor="destination" className={`form-label ${searchPage ? "text-dark" : "text-light"} fw-bold`}>
            Đến
          </label>
          <div className="input-group">
            <div className="input-group-text text-primary">
              <i className="bi bi-geo-alt-fill"></i>
            </div>
            <input
              id="destination"
              className="form-control"
              placeholder="Điểm đến"
              value={formData.destination}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, destination: e.target.value }))
              }
              list="destinationLocations"
            />
          </div>
          <datalist id="destinationLocations">
            {locations.to.map((loc, idx) => (
              <option key={idx} value={loc} />
            ))}
          </datalist>
        </div>
        <div className="col-md-3">
          <label htmlFor="departureDate" className={`form-label ${searchPage ? "text-dark" : "text-light"} fw-bold`}>
            Ngày đi
          </label>
          <div className="input-group">
            <div className="input-group-text text-primary">
              <i className="bi bi-calendar"></i>
            </div>
            <input
              id="departureDate"
              className="form-control"
              type="date"
              value={formData.departureDate}
              min={today}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, departureDate: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="col-md">
          <label className="form-label text-light fw-bold d-block">&nbsp;</label>
          <button type="button" className="btn btn-secondary text-white" onClick={handleSubmit}>
            <i className="bi bi-search"></i> 
          </button>
        </div>
      </form>
    </div>
  );
};

export default FlightSearch;
