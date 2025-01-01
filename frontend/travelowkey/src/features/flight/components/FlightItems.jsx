import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import React from "react";

const FlightItems = ({ flights, passengers }) => {
   const changeMoneyFormat = (price) => {
      return new Intl.NumberFormat("vi-VN", {
         style: "currency",
         currency: "VND",
      }).format(price);
   };

   if (!flights || flights.length === 0) {
      return <div className="title" style={{minHeight:"20rem"}}>Không tìm thấy kết quả phù hợp</div>;
   }
   const iconList = {
      "Vietnam Airlines": "/assets/images/Vietnam Airlines.png",
      "VietJet Air": "/assets/images/VietJet Air.png",
      "Bamboo Airways": "/assets/images/Bamboo Airways.png",
      "Vietravel Airlines": "/assets/images/Vietravel Airlines.png",
  }
   const navigateToPaymentScreen = (flight, passengers) => {
      const params = new URLSearchParams({
         id: flight.Id,
         name: flight.Name,
         departure_time: flight.DepartureTime,
         from_location: flight.From,
         arrival_time: flight.ArrivalTime,
         to_location: flight.To,
         price: flight.Price,
         passengers: passengers
      }).toString();
      window.location.href = `/payment/flight?${params}`;
   }

   return (
      <div id="result-container" className="container">
         {flights.map((flight) => (
            <div
               key={flight.Id}
               id={`result-item-${flight.Id}`}
               className="result-item mb-4 p-3 border rounded shadow"
            >
               <div className="row align-items-center justify-content-between">
                  <div className="col-md-3 d-flex align-items-center">
                     {flight.Name in iconList ? (<img src={iconList[flight.Name]} alt={flight.Name} className="icon" style={{width: "2rem", height: "1rem"}}/>) : (<i className="bi bi-airplane-fill me-2"></i>)}
                     {/* <i className="bi bi-airplane-fill me-2"></i> */}
                     <div className="text fw-bold px-1">{flight.Name}</div>
                  </div>
                  <div className="col-md-5 d-flex justify-content-between">
                     <div className="departure">
                        <div className="time fw-bold">
                           {flight.DepartureTime}
                        </div>
                        <div className="location">{flight.From}</div>
                     </div>
                        <i className="bi-arrow-right h3"></i>
                     <div className="destination">
                        <div className="time fw-bold">{flight.ArrivalTime}</div>
                        <div className="location">{flight.To}</div>
                     </div>
                  </div>
                  <div className="col-md-3 text-end d-flex justify-content-end">
                     <div className="price-text fw-bold text-danger">
                        {changeMoneyFormat(flight.Price)} VND
                     </div>
                     <div className="text">/khách</div>
                  </div>
               </div>
               <div className="row mt-3">
                 <div className="col d-flex justify-content-end">
                   <button
                     className="btn btn-primary w-25"
                     onClick={() => navigateToPaymentScreen(flight, passengers)}
                   >
                     Chọn
                   </button>
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
