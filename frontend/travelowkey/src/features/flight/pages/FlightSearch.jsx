import React from "react";
import HeaderContainer from "../../../components/HeaderContainer";
import CarouselComponent from "../../../components/Carousel";
import FlightSearch from "../components/FlightSearchForm";
import FlightRecommendation from "../components/FlightRecomendation";
import Footer from "../../../components/Footer";

const FlightSearchScreen = () => {
    return (
      <div>
        <HeaderContainer scrollFlag={true}/>
        <div className="container-fluid justify-content-center" style={{paddingTop:"8rem"}}></div>
        <CarouselComponent useBackground={true}/>
        <div className="container-lg shadow px-5">
          <FlightSearch searchPage={true} />
        </div>
        <FlightRecommendation />
        <Footer />
      </div>
    );

  };
  
  export default FlightSearchScreen;