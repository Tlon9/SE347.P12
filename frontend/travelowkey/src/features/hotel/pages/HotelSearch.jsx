import React, {useState,useEffect} from "react";
import HeaderContainer from "../../../components/HeaderContainer";
import CarouselComponent from "../../../components/Carousel";
import HotelSearch from "../components/HotelSearchForm";
import HotelRecommendation from "../components/HotelRecomendation";
import Footer from "../../../components/Footer";

const HotelSearchScreen = () => {
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${day}-${month}-${year}`;
  };

  const checkInDate = formatDate(Date.now());
  const checkOutDate = formatDate(Date.now());
  const roomCount = 1;
  const passengerCount = 1;
  const [recommendedHotels, setRecommendedhotels] = useState([]);
  const recomImgList = ['angiang','cantho','dalat', 'haiphong','hanoi', 'hatinh', 'hcm', 'khanhhoa', 'lamdong','phuquoc']
 
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
            ? `http://127.0.0.1:8008/hotels/recommendation?user_id=${userId}`
            : "http://127.0.0.1:800/hotels/recommendation";
  
          const recommendationsResponse = await fetch(recommendationUrl);
          if (recommendationsResponse.ok) {
            const recommendationsData = await recommendationsResponse.json();
            setRecommendedhotels(recommendationsData.recommendations || []);
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
      <div className="container-lg shadow px-5 py-3">
        <HotelSearch searchPage={true} />
      </div>
      <HotelRecommendation />
      <div className="container mt-3">
        <div className="d-flex flex-row overflow-auto">
          {recommendedHotels.map((hotel, idx) => (
            <div 
              key={idx} 
              className="card mb-2 mx-2" 
              style={{ width: '250px', flex: '0 0 auto', borderRadius: '16px', overflow: 'hidden' }}
            >
              {/* Hotel Image */}
              <img 
                src={`/assets/images/recom-${recomImgList[Math.floor(Math.random() * recomImgList.length)]}.jpg`} 
                className="card-img-top" 
                alt={`${hotel.Name}`} 
                style={{ height: '100px', objectFit: 'cover' }}
              />
              {/* Card Body */}
              <div className="card-body p-2">
                <h6 className="card-title text-truncate" title={hotel.Name}>
                  {hotel.Name}
                </h6>
                <p className="card-text text-muted mb-1">
                  {hotel.Area}
                </p>
                <p className="card-text text-danger fw-bold">
                  ${hotel.Price.toFixed(2)}
                </p>
                <a 
                  href={`/hotel/result?location=${hotel.Area}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomCount=${roomCount}&passengerCount=${passengerCount}`} 
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

export default HotelSearchScreen;