import React , {useState} from "react";
import { useLocation } from "react-router-dom";
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

    // State to track the total amount
    const [totalAmount, setTotalAmount] = useState(Math.max(
        checkInDate && checkOutDate && !isNaN(new Date(checkInDate)) && !isNaN(new Date(checkOutDate)) 
        ? roomData.price * (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
        : 0,
        1
    ));

    // Callback to update the total amount
    const handleAmountChange = (newAmount) => {
        setTotalAmount(newAmount);
    };

    return (
        <div className="bg-light">
            <HeaderContainer scrollFlag={true} />
            <div className="container-fluid justify-content-center" style={{ paddingTop: "10rem" }}></div>
            <div className="container" style={{ maxWidth: "40rem" }}>
                <h4 className="text-primary">Thông tin thanh toán khách sạn</h4>
                <div className="bg-white p-3 rounded shadow">
                    <p><strong>Khách sạn:</strong> {hotelData.name}</p>
                    <p><strong>Phòng:</strong> {roomData.name} - {roomData.room_id}</p>
                    <p><strong>Ngày nhận phòng:</strong> {checkInDate}</p>
                    <p><strong>Ngày trả phòng:</strong> {checkOutDate}</p>
                    <p><strong>Số khách:</strong> {passengers}</p>
                    <p><strong>Dịch vụ phòng:</strong> {roomService}</p>
                    <p className="d-flex">
                        <strong>Tổng số tiền:</strong> 
                        <p className="text-secondary fw-bold px-2">
                            {" "}{Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(totalAmount)}
                        </p>
                    </p>
                </div> 
                <HotelPaymentForm 
                    hotel={hotelData} 
                    room={roomData} 
                    checkInDate={checkInDate} 
                    checkOutDate={checkOutDate} 
                    roomService={roomService}
                    onAmountChange={handleAmountChange} // Pass the callback
                />
            </div>
            <div className="container-fluid justify-content-center" style={{ paddingTop: "8rem" }}></div>
            <Footer />
        </div>
    );
};

export default HotelPaymentScreen;
