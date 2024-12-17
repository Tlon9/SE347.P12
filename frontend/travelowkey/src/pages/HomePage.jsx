import React from "react";
import HeaderContainer from "../components/HeaderContainer";
import TopBackground from "../components/TopBackground";
import FeatureNavbar from "../components/FeatureNavbar";
import CarouselComponent from "../components/Carousel";
import FlightRecommendation from "../components/FlightRecomendation";
import HotelRecommendation from "../components/HotelRecomendation";


const Homepage = () => {
  return (
    <div>
      {/* Top Background */}
      <TopBackground />
      {/* Header */}
      <HeaderContainer />
      
      <div className="container-fluid justify-content-center" style={{paddingTop:"10rem"}}>
        <div className="fs-1 fw-bold text-light text-center">
            Từ Đông Nam Á đến thế giới, trong tầm tay của bạn   
        </div>
      </div>
      <div className="container-lg mt-5 px-5">
        <FeatureNavbar />
      </div>
      <div className="container-fluid bg-white mt-5" style={{minHeight:"100rem", borderRadius: "5rem 5rem 0 0",}}>
        <CarouselComponent />
        <FlightRecommendation />
        <HotelRecommendation />
      </div>  
      {/* Footer */}
      <footer className="bg-light py-3 text-center">
        <p className="mb-0 text-muted">&copy; 2024 Travelowkey. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
