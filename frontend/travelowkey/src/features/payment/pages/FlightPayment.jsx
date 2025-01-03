import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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

    // State to track the total amount
    const [totalAmount, setTotalAmount] = useState(flightData.Price * passengers);

    // Callback to update the total amount
    const handleAmountChange = (newAmount) => {
        setTotalAmount(newAmount);
    };

    if (!flightData.Id) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-light">
            <HeaderContainer scrollFlag={true} />
            <div className="container-fluid justify-content-center d-flex" style={{ paddingTop: "10rem" }}></div>
            <div className="container" style={{ maxWidth: "40rem" }}>
                <h4 className="text-primary">Thông tin thanh toán</h4>
                <div className="bg-white shadow p-3 rounded">
                    <p><strong>Chuyến bay:</strong> {flightData.Name} - {flightData.Id}</p>
                    <p><strong>Hành trình:</strong> {flightData.From} → {flightData.To}</p>
                    <p><strong>Thời gian khởi hành:</strong> {flightData.DepartureTime}</p>
                    <p><strong>Số vé:</strong> {passengers}</p>
                    <p className="d-flex">
                        <strong>Tổng số tiền:</strong> 
                        <p className="text-secondary fw-bold px-2">
                            {" "}{Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(totalAmount)}
                        </p>
                    </p>
                </div> 
                    <FlightPaymentForm 
                        flight={flightData} 
                        passengers={passengers} 
                        onAmountChange={handleAmountChange} // Pass the callback
                    />
            </div>
            <div className="container-fluid justify-content-center" style={{ paddingTop: "8rem" }}></div>
            <Footer />
        </div>
    );
};

export default FlightPaymentScreen;
