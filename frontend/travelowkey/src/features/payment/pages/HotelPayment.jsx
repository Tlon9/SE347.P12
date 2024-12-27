import React from "react";
import { useParams, useLocation } from "react-router-dom";
import HeaderContainer from "../../../components/HeaderContainer.jsx";
import Footer from "../../../components/Footer.jsx";
import HotelPaymentForm from "../components/HotelPaymentForm.jsx";

const HotelPaymentScreen = () => {
    const location = useLocation();

    // Extract hotel booking details from URL parameters
    const searchParams = new URLSearchParams(location.search);
    const hotelData = {
        name: searchParams.get("hotel"),
    };
    const roomData = {
        room_id: searchParams.get("room_id"),
        name: searchParams.get("room_name"),
        price: parseFloat(searchParams.get("room_price")),
    };
    const checkInDate = searchParams.get("check_in_date").split("-").reverse().join("-");
    const checkOutDate = searchParams.get("check_out_date").split("-").reverse().join("-");
    console.log((new Date(checkOutDate) - new Date(checkInDate)));
    const passengers = parseInt(searchParams.get("passengers"), 10) || 1;
    const roomService = searchParams.get("room_service");

    if (!hotelData.name || !roomData.room_id) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <HeaderContainer scrollFlag={true} />
            <div className="container-fluid justify-content-center" style={{ paddingTop: "8rem" }}></div>
            <div className="container">
                <h4 className="text-primary">Thông tin thanh toán khách sạn</h4>
                <div className="bg-light p-3 rounded">
                    <p><strong>Khách sạn:</strong> {hotelData.name}</p>
                    <p><strong>Phòng:</strong> {roomData.name} - {roomData.room_id}</p>
                    <p><strong>Ngày nhận phòng:</strong> {checkInDate}</p>
                    <p><strong>Ngày trả phòng:</strong> {checkOutDate}</p>
                    <p><strong>Số khách:</strong> {passengers}</p>
                    <p><strong>Dịch vụ phòng:</strong> {roomService}</p>
                    <p><strong>Tổng số tiền:</strong> 
                        {" "}{Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                             Math.max(
                                checkInDate && checkOutDate && !isNaN(new Date(checkInDate)) && !isNaN(new Date(checkOutDate)) 
                                ? roomData.price * (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
                                : 0,
                                1
                            )
                        )}
                    </p>
                </div> 
                <HotelPaymentForm 
                    hotel={hotelData} 
                    room={roomData} 
                    checkInDate={checkInDate} 
                    checkOutDate={checkOutDate} 
                    roomService={roomService}
                />
            </div>
            <div className="container-fluid justify-content-center" style={{ paddingTop: "8rem" }}></div>
            <Footer />
        </div>
    );
};

export default HotelPaymentScreen;
