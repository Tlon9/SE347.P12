import React, { useState, useEffect } from "react";
import HeaderContainer from "../../../components/HeaderContainer";
import Footer from "../../../components/Footer";
import {fetchHotels} from "../services.js";
import HotelResults from "../components/HotelResultForm.jsx";
import { useLocation } from "react-router-dom";
const HotelResult = () => {
    const url = window.location.href;
    const [hotels, setHotels] = useState([]);
    const [formData, setFormData] = useState({});
    const location = useLocation();
    
    useEffect(() => {
        // const fetchData = async () => {
        //     const result = await fetchFlights(url);
        //     setFlights(result.flights);
        // };
        // fetchData();
        // Parse query parameters from the URL
        const params = new URLSearchParams(location.search);
        const data = {
        location: params.get("location"),
        checkInDate: params.get("checkInDate"),
        checkOutDate: params.get("checkOutDate"),
        roomCount: params.get("roomCount"),
        passengerCount: params.get("passengerCount"),
        };
        setFormData(data);
        const fetchData = async () => {
            const result = await fetchHotels(url, 0, 5);
            setHotels(result.hotels);
        };
        fetchData();
    }, [url, location.search]);
    return (
        <div>
            <HeaderContainer scrollFlag={true}/>
            <div className="container-fluid justify-content-center" style={{paddingTop:"8rem"}}></div>
            <HotelResults hotels={hotels} formData={formData} url={url}/>
            <Footer/>
        </div>
    );
}
export default HotelResult;