import React from "react";
import PropTypes from "prop-types";

const HotelItems = ({ hotels, formData }) => {
  const changeMoneyFormat = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleSubmit = (hotelID, hotelName) => {
    // const { location, checkinDate, checkoutDate } = hotelSearchInfo;
    // if (!location) return alert('Location is required');
    // if (!checkinDate || !checkoutDate) return alert('Dates are required');
    // if (new Date(checkinDate) > new Date(checkoutDate)) return alert('Checkin date must be before checkout date');

    // sessionStorage.setItem('HotelSearchInfo', JSON.stringify(hotelSearchInfo));
    // const passengerCount = passengerInfo.adult + passengerInfo.child;
    // const roomCount = passengerInfo.numberOfRoom
    // const checkInDate = hotelSearchInfo.checkinDate.split('-').reverse().join('-');
    // const checkOutDate = hotelSearchInfo.checkoutDate.split('-').reverse().join('-');
    window.location.href = `/room/result?hotelName=${hotelName}&hotelID=${hotelID}&checkInDate=${formData.checkInDate}&checkOutDate=${formData.checkOutDate}&roomCount=${formData.roomCount}&passengerCount=${formData.passengerCount}`;
};
  

  if (!hotels || hotels.length === 0) {
    return <div className="title">Không tìm thấy khách sạn phù hợp</div>;
  }

  return (
    <div id="hotel-container" className="container">
        {hotels.map((hotel) => (
            <div
            key={hotel.id}
            id={`hotel-item-${hotel.id}`}
            className="hotel-item mb-3 p-2 border rounded shadow d-flex align-items-center"
            >
            {/* Left: Image */}
            <div className="hotel-photo me-3" style={{ width: "50%" }}>
                <img
                src={hotel.Img}
                alt={hotel.Name}
                className="img-fluid rounded"
                style={{
                    width: "100%",
                    height: "100%", // Adjust height as needed
                    objectFit: "cover",
                }}
                />
            </div>

            {/* Right: Hotel Details */}
            <div className="hotel-details w-100">
                <h5 className="hotel-name fw-bold" style={{ fontSize: "1rem" }}>
                {hotel.name}
                </h5>
                <div
                className="hotel-address mb-1 text-muted"
                style={{ fontSize: "0.9rem" }}
                >
                    <i className="bi bi-geo-alt-fill me-1"></i>
                    {hotel.Address}
                </div> 
                <div className="hotel-stars mb-1">
                    {Array.from({ length: hotel.Rating }).map((_, index) => (
                        <i
                        key={index}
                        className="bi bi-star-fill text-warning"
                        style={{ fontSize: "1rem" }}
                        ></i>
                    ))}
                </div>
                <div
                className="hotel-price text-end"
                style={{ fontSize: "0.9rem", lineHeight: "1rem" }}
                >
                <div className="price-text fw-bold">{changeMoneyFormat(hotel.Price)}</div>
                </div>
                <div className="row mt-2">
                <div className="col d-flex justify-content-end">
                    <button
                    className="btn btn-secondary text-white"
                    style={{ fontSize: "0.9rem", width: "100px" }}
                    onClick={() => handleSubmit(hotel.Id, hotel.Name)}
                    >
                    Chọn
                    </button>
                </div>
                </div>
            </div>
            </div>
        ))}
    </div>
    // <div id="hotel-container" className="container">
    //   {hotels.map((hotel) => (
    //     <div
    //       key={hotel.id}
    //       id={`hotel-item-${hotel.id}`}
    //       className="hotel-item mb-4 p-3 border rounded shadow"
    //       style={{
    //         minHeight: "200px", // Reduce the overall height of the item
    //       }}
    //     >
    //       <div className="hotel-photo text-center mb-3">
    //         <img
    //           src={hotel.Img}
    //           alt={hotel.Name}
    //           className="img-fluid rounded"
    //           style={{
    //             width: "100%", // Ensure the image width matches the item's width
    //             height: "150px", // Decrease the height
    //             objectFit: "cover", // Maintain aspect ratio and crop excess
    //           }}
    //         />
    //       </div>
    //       <div className="hotel-details">
    //         <h5 className="hotel-name fw-bold">{hotel.name}</h5>
    //         <div className="hotel-stars mb-2">
    //           {Array.from({ length: hotel.Rating }).map((_, index) => (
    //             <i
    //               key={index}
    //               className="bi bi-star-fill text-warning"
    //               style={{ fontSize: "1.2rem" }}
    //             ></i>
    //           ))}
    //         </div>
    //         <div className="hotel-address mb-2 text-muted">
    //           <i className="bi bi-geo-alt-fill me-2"></i>
    //           {hotel.Address}
    //         </div>
    //         <div className="hotel-price text-end">
    //           <div className="price-text fw-bold">
    //             {changeMoneyFormat(hotel.Price)}
    //           </div>
    //           <div className="text-muted">/đêm</div>
    //         </div>
    //       </div>
    //       <div className="row mt-3">
    //         <div className="col d-flex justify-content-end">
    //           <button className="btn btn-primary w-25">Chọn</button>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
};

HotelItems.propTypes = {
  hotels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      photo: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      stars: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default HotelItems;
