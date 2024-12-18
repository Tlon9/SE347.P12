import React, { useState, useEffect } from "react";
import HeaderContainer from "../../../components/HeaderContainer";
import Footer from "../../../components/Footer";
import {fetchFlights} from "../services.js";
import FlightResults from "../components/FlightResultForm.jsx";
const FlightResult = () => {
    const url = window.location.href;
    const [flights, setFlights] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchFlights(url);
            setFlights(result.flights);
        };
        fetchData();
    }, [url]);
    return (
        <div>
            <HeaderContainer scrollFlag={true}/>
            <div className="container-fluid justify-content-center" style={{paddingTop:"8rem"}}></div>
            <FlightResults flights={flights}/>
            <Footer/>
        </div>
    );
}
export default FlightResult;