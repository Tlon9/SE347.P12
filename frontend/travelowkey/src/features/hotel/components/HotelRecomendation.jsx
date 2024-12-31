import React, { useEffect, useState } from 'react';

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
            Tìm khách sạn
          </div>
        </div>
      </div>
    );
  };

const HotelRecommendation = () => {

  const [hotelData, setHotelData] = useState({
    HAN: '0',
    SGN: '0',
    DAD: '0',
    VTU: '0',
  });

  useEffect(() => {
    // Fetch Hotel Data
    fetch(`http://127.0.0.1:8008/hotels/getHotelCount`)
      .then((response) => response.json())
      .then((data) => setHotelData(data))
      .catch((error) => console.error('Error fetching hotel data:', error));
  }, []);

  const handleHotelClick = (location) => {
    sessionStorage.setItem('hotelLocation', JSON.stringify({ value: location }));
    window.location.href = '../hotel/search';
  };

  return (
    <div className="container my-5">
      {/* Title */}
      <div className="text-start mb-4">
        <h2 className="fw-bold">
          <i className="bi bi-building-fill me-2" style={{ color:"rgb(4, 56, 159)"}}></i>
          Du lịch không phải lo chỗ ở
        </h2>
      </div>

      {/* Recommendation List */}
      <div className="row">
        <RecommendationItem
          id="item-hanoi-hotel"
          label="Hà Nội"
          text={`Có ${hotelData.HAN} khách sạn`}
          backgroundImage="/assets/images/hotel-recom-hanoi.jpeg"
          onClick={() => handleHotelClick('Hà Nội (HAN)')}
        />
        <RecommendationItem
          id="item-hcm-hotel"
          label="Hồ Chí Minh"
          text={`Có ${hotelData.SGN} khách sạn`}
          backgroundImage="/assets/images/hotel-recom-hcm.jpeg"
          onClick={() => handleHotelClick('TP HCM (SGN)')}
        />
        <RecommendationItem
          id="item-danang-hotel"
          label="Đà Nẵng"
          text={`Có ${hotelData.DAD} khách sạn`}
          backgroundImage="/assets/images/recom-phuquoc.jpeg"
          onClick={() => handleHotelClick('Đà Nẵng (DAD)')}
        />
        <RecommendationItem
          id="item-dalat-hotel"
          label="Vũng Tàu"
          text={`Có ${hotelData.VTU} khách sạn`}
          backgroundImage="/assets/images/recom-dalat.jpeg"
          onClick={() => handleHotelClick('Đà Lạt (DLI)')}
        />
      </div>
    </div>
  );
};

export default HotelRecommendation;
