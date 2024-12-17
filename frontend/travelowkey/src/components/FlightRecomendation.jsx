import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Reusable Recommendation Item
const RecommendationItem = ({ id, label, text, backgroundImage, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <div
        className="col-md-3 mb-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="p-3 rounded d-flex flex-column justify-content-between position-relative"
          style={{
            height: '200px',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: 'inset 0 0 0 1000px rgba(80, 80, 80, 0.5)',
            color: 'white',
            cursor: 'pointer',
          }}
          onClick={onClick}
        >
          {/* Main Content */}
          <div>
            <h4 className="fw-bold">{label}</h4>
            <p>{text}</p>
          </div>
  
          {/* Button */}
          <div
            className={`recom-btn btn btn-outline-secondary text-white ${
              isHovered ? 'show' : 'hide'
            } mb-2`}
          >
            Tìm chuyến bay
          </div>
        </div>
      </div>
    );
  };

const FlightRecommendation = () => {
  const [flightData, setFlightData] = useState({
    HAN: '0',
    SGN: '0',
    DLI: '0',
    DAD: '0',
  });

  const [hotelData, setHotelData] = useState({
    HAN: '0',
    SGN: '0',
    DAD: '0',
    VTU: '0',
  });

  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

  useEffect(() => {
    // Fetch Flight Data
    axios.get(`/flight/api/recom-flight?date=${today}`).then((res) => {
      setFlightData(res.data);
    });

    // Fetch Hotel Data
    axios.get('/hotel/api/recom-hotel').then((res) => {
      setHotelData(res.data);
    });
  }, []);

  const handleFlightClick = (location) => {
    sessionStorage.setItem('flightDestination', JSON.stringify({ value: location }));
    window.location.href = '../flight/search';
  };

  return (
    <div className="container my-5">
      {/* Title */}
      <div className="text-start mb-4">
        <h2 className="fw-bold">
          <i className="bi bi-airplane-fill me-2" style={{ color: '#236eff' }}></i>
          Tái khám phá bản thân trên bầu trời Việt Nam
        </h2>
      </div>

      {/* Recommendation List */}
      <div className="row">
        <RecommendationItem
          id="item-hanoi-flight"
          label="Hà Nội"
          text={`Có ${flightData.HAN} chuyến bay`}
          backgroundImage="assets/images/hotel-recom-hanoi.jpeg"
          onClick={() => handleFlightClick('Hà Nội (HAN)')}
        />
        <RecommendationItem
          id="item-hcm-flight"
          label="Hồ Chí Minh"
          text={`Có ${flightData.SGN} chuyến bay`}
          backgroundImage="assets/images/hotel-recom-hcm.jpeg"
          onClick={() => handleFlightClick('TP HCM (SGN)')}
        />
        <RecommendationItem
          id="item-danang-flight"
          label="Đà Nẵng"
          text={`Có ${flightData.DAD} chuyến bay`}
          backgroundImage="assets/images/recom-phuquoc.jpeg"
          onClick={() => handleFlightClick('Đà Nẵng (DAD)')}
        />
        <RecommendationItem
          id="item-dalat-flight"
          label="Đà Lạt"
          text={`Có ${flightData.DLI} chuyến bay`}
          backgroundImage="assets/images/recom-dalat.jpeg"
          onClick={() => handleFlightClick('Đà Lạt (DLI)')}
        />
      </div>
    </div>
  );
};

export default FlightRecommendation;
