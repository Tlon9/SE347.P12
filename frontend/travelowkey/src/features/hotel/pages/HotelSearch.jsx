import React from "react";
import HeaderContainer from "../../../components/HeaderContainer";
import CarouselComponent from "../../../components/Carousel";
import HotelSearch from "../components/HotelSearchForm";
import HotelRecommendation from "../components/HotelRecomendation";
import Footer from "../../../components/Footer";

const HotelSearchScreen = () => {
  return (
    <div>
      <HeaderContainer scrollFlag={true}/>
      <div className="container-fluid justify-content-center" style={{paddingTop:"8rem"}}></div>
      <CarouselComponent useBackground={true}/>
      <div className="container-lg shadow px-5">
        <HotelSearch searchPage={true} />
      </div>
      <HotelRecommendation />
      <Footer />
    </div>
  );

};

export default HotelSearchScreen;