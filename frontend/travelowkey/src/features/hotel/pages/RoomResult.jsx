import React, { useState, useEffect } from "react";
import HeaderContainer from "../../../components/HeaderContainer";
import Footer from "../../../components/Footer";
import {fetchRooms} from "../services.js";
import RoomResults from "../components/RoomResultForm.jsx";
import { useLocation } from "react-router-dom";
const RoomResult = () => {
    const url = window.location.href;
    const [rooms, setRooms] = useState([]);
    const [formData, setFormData] = useState({});
    const location = useLocation();
    
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const data = {
        name: params.get("hotelName"),
        hotelID: params.get("hotelID"),
        checkInDate: params.get("checkInDate"),
        checkOutDate: params.get("checkOutDate"),
        roomCount: params.get("roomCount"),
        passengerCount: params.get("passengerCount"),
        };
        setFormData(data);
        const fetchData = async () => {
            const result = await fetchRooms(url);
            setRooms(result.rooms);
        };
        fetchData();
    }, [url, location.search]);
    return (
        <div>
            <HeaderContainer scrollFlag={true}/>
            <div className="container-fluid justify-content-center" style={{paddingTop:"8rem"}}></div>
            <RoomResults rooms={rooms} formData={formData} url={url}/>
            <Footer/>
        </div>
    );
}
export default RoomResult;