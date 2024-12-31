import React from "react";
import HeaderContainer from "../../../components/HeaderContainer";
import CarouselComponent from "../../../components/Carousel";
import LoginForm from "../components/LoginForm";
import Footer from "../../../components/Footer";
import SignUpForm from "../components/SingUpForm";

const SignUpScreen = () => {
    return (
      <div>
        <HeaderContainer scrollFlag={true}/>
        <div className="container-fluid justify-content-center" style={{paddingTop:"8rem"}}></div>
        <div className="container-lg shadow px-5 py-4">
          <SignUpForm/>
        </div>
        <Footer />
      </div>
    );

  };
  
  export default SignUpScreen;