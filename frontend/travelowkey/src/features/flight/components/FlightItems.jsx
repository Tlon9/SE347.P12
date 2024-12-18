import React from "react";
import PropTypes from "prop-types";

const FlightItems = ({ flights }) => {
   const changeMoneyFormat = (price) => {
      return new Intl.NumberFormat("vi-VN", {
         style: "currency",
         currency: "VND",
      }).format(price);
   };

   if (!flights || flights.length === 0) {
      return <div className="title">Không tìm thấy kết quả phù hợp</div>;
   }

   return (
      <div id="result-container" className="container">
         {flights.map((flight) => (
            <div
               key={flight.Id}
               id={`result-item-${flight.Id}`}
               className="result-item mb-4 p-3 border rounded shadow"
            >
               <div className="row align-items-center">
                  <div className="col-md-3 d-flex align-items-center">
                     <i className="bi bi-airplane-fill me-2"></i>
                     <div className="text">{flight.Name}</div>
                  </div>
                  <div className="col-md-6 d-flex justify-content-between">
                     <div className="departure">
                        <div className="time fw-bold">
                           {flight.DepartureTime}
                        </div>
                        <div className="location">{flight.From}</div>
                     </div>
                     <i className="bi bi-ellipsis-horizontal"></i>
                     <div className="destination">
                        <div className="time fw-bold">{flight.ArrivalTime}</div>
                        <div className="location">{flight.To}</div>
                     </div>
                  </div>
                  <div className="col-md-3 text-end">
                     <div className="price-text fw-bold">
                        {changeMoneyFormat(flight.Price)} VND
                     </div>
                     <div className="text">/khách</div>
                  </div>
               </div>
               <div className="row mt-3">
                  <div className="col d-flex justify-content-end">
                     <button className="btn btn-primary w-25">Chọn</button>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
};

// FlightResult.propTypes = {
//   flights: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       name: PropTypes.string.isRequired,
//       departure_time: PropTypes.string.isRequired,
//       from_location: PropTypes.string.isRequired,
//       arrival_time: PropTypes.string.isRequired,
//       to_location: PropTypes.string.isRequired,
//       price: PropTypes.number.isRequired,
//     })
//   ).isRequired,
// };

export default FlightItems;
