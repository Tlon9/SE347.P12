import React, {useState, useEffect} from "react";
import HeaderContainer from "../../../components/HeaderContainer";
import CarouselComponent from "../../../components/Carousel";
import FlightSearch from "../components/FlightSearchForm";
import FlightRecommendation from "../components/FlightRecomendation";
import Footer from "../../../components/Footer";

const FlightSearchScreen = () => {
  const [recommendedFlights, setRecommendedFlights] = useState([]);
  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
      return null;
    };

    const getRecommendations = async () => {
      try {
        const access_token = getCookie("access_token");

        if (!access_token) {
          console.error("No access token found");
          return;
        }

        // Verify user
        const verifyResponse = await fetch("http://127.0.0.1:8800/user/verify/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });

        let userId = null;

        if (verifyResponse.ok) {
          const verifyData = await verifyResponse.json();
          userId = verifyData.user_id;
        }

        // Fetch recommendations
        const recommendationUrl = userId
          ? `http://127.0.0.1:8000/flights/recommendation?user_id=${userId}`
          : "http://127.0.0.1:8000/flights/recommendation";

        const recommendationsResponse = await fetch(recommendationUrl);
        if (recommendationsResponse.ok) {
          const recommendationsData = await recommendationsResponse.json();
          setRecommendedFlights(recommendationsData.recommendations || []);
        } else {
          console.error("Failed to fetch recommendations:", recommendationsResponse.statusText);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    getRecommendations();
  }, []); 
    return (
      <div>
      <HeaderContainer scrollFlag={true}/>
      <div className="container-fluid justify-content-center" style={{paddingTop:"8rem"}}></div>
      <CarouselComponent useBackground={true}/>
      <div className="container-lg shadow px-5">
        <FlightSearch searchPage={true} />
      </div>
      <FlightRecommendation />
      <div className="container mt-3">
        <div className="d-flex flex-row overflow-auto">
          {recommendedFlights.map((flight, idx) => (
            <div 
              key={idx} 
              className="card mb-2 mx-2" 
              style={{ minWidth: '150px', flex: '0 0 auto', borderRadius: '16px', overflow: 'hidden' }}
            >
              {/* Flight Image */}
              <img 
                src="path_to_placeholder_image/destinationcard_form.png" 
                className="card-img-top" 
                alt={`${flight.Name}`} 
                style={{ height: '100px', objectFit: 'cover' }}
              />
              {/* Card Body */}
              <div className="card-body p-2">
                <h6 className="card-title text-truncate" title={flight.Name}>
                  {flight.Name}
                </h6>
                <p className="card-text text-muted mb-1">
                  {flight.From} - {flight.To}
                </p>
                <p className="card-text text-danger fw-bold">
                  ${flight.Price.toFixed(2)}
                </p>
                <a 
                  href={`/flight/result?from=${flight.From}&to=${flight.To}&date=${flight.Date.split('-').reverse().join('-')}&seatType=${flight.SeatClass}&passengerCount=1`} 
                  className="btn btn-sm btn-primary"
                >
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container-fluid justify-content-center" style={{paddingTop:"4rem"}}></div>
      <Footer />
      </div>
    );

  };
  
  export default FlightSearchScreen;