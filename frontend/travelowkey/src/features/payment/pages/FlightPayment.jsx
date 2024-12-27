import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import HeaderContainer from "../../../components/HeaderContainer.jsx";
import Footer from "../../../components/Footer.jsx";
import FlightPaymentForm from "../components/FlightPaymentForm.jsx";

const FlightPaymentScreen = () => {
    const location = useLocation();

    // Extract flight details from URL parameters
    const searchParams = new URLSearchParams(location.search);
    const flightData = {
        Id: searchParams.get('id'),
        Name: searchParams.get('name'),
        DepartureTime: searchParams.get('departure_time'),
        From: searchParams.get('from_location'),
        ArrivalTime: searchParams.get('arrival_time'),
        To: searchParams.get('to_location'),
        Price: parseFloat(searchParams.get('price')),
    };
    const passengers = parseInt(searchParams.get('passengers'), 10) || 1;

    if (!flightData.Id) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <HeaderContainer scrollFlag={true} />
            <div className="container-fluid justify-content-center" style={{ paddingTop: "8rem" }}></div>
            <div className="container">
                <h4 className="text-primary">Thông tin thanh toán</h4>
                <div className="bg-light p-3 rounded">
                    <p><strong>Chuyến bay:</strong> {flightData.Name} - {flightData.Id}</p>
                    <p><strong>Hành trình:</strong> {flightData.From} → {flightData.To}</p>
                    <p><strong>Thời gian khởi hành:</strong> {flightData.DepartureTime}</p>
                    <p><strong>Số vé:</strong> {passengers}</p>
                    <p><strong>Tổng số tiền:</strong> 
                        {" "}{Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(flightData.Price * passengers)}
                    </p>
                </div> 
                <FlightPaymentForm flight={flightData} passengers={passengers} />
            </div>
            <div className="container-fluid justify-content-center" style={{ paddingTop: "8rem" }}></div>
            <Footer />
        </div>
    );
};

export default FlightPaymentScreen;
