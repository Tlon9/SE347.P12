import React from "react";
import HeaderContainer from "../../../components/HeaderContainer";
import CarouselComponent from "../../../components/Carousel";
import AccountForm from "../components/AccountForm";
import Footer from "../../../components/Footer";

const AccountScreen = () => {
    return (
      <div className="bg-light">
        <HeaderContainer scrollFlag={true}/>
        <div className="container-fluid justify-content-center" style={{paddingTop:"8rem"}}></div>
        {/* <div className="container-lg shadow px-5 py-4">
          <LoginForm/>
        </div> */}
        <AccountForm/>
        <Footer />
      </div>
    );

  };
  
  export default AccountScreen;