import React, { useState, useEffect } from "react";
import HeaderContainer from "../../../components/HeaderContainer";
import Footer from "../../../components/Footer";
import { fetchFlights } from "../services.js";
import FlightResults from "../components/FlightResultForm.jsx";

const FlightResult = () => {
    const url = window.location.href;
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await fetchFlights(url);
            setFlights(result.flights);
            setLoading(false);
        };
        fetchData();
    }, [url]);

    return (
        <div>
            <HeaderContainer scrollFlag={true} />
            <div className="container-fluid justify-content-center" style={{ paddingTop: "8rem", background: "rgb(247, 249, 259)"}}></div>
            {loading ? (
                <div className="text-center my-3">
                    <div className="fw-bold text-primary">Đang tìm kiếm chuyến bay</div>
                    <div className="my-2">
                        <img src="/assets/images/loading.gif" alt="Loading" width="50" />
                    </div>
                </div>
            ) : (
                <FlightResults flights={flights} />
            )}
            <div className="container-fluid justify-content-center" style={{ paddingTop: "8rem" }}></div>
            <Footer />
        </div>
    );
};

export default FlightResult;