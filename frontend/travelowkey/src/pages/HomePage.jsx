import React from "react";
import Header from "../components/HeaderContainer";
import TopBackground from "../components/TopBackground";
import FeatureNavbar from "../components/FeatureNavbar";
import CarouselComponent from "../components/Carousel";
import FlightRecommendation from "../features/flight/components/FlightRecomendation";
import HotelRecommendation from "../features/hotel/components/HotelRecomendation";
import Footer from "../components/Footer";


const Homepage = () => {
  return (
    <div>
      {/* Top Background */}
      <TopBackground />
      {/* Header */}
      <Header scrollFlag={false}/>
      
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
      <Footer />
    </div>
  );
};

export default Homepage;
