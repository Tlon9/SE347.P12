import React from "react";
import HeaderContainer from "../components/HeaderContainer";
import TopBackground from "../components/TopBackground";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";

const Homepage = () => {
  return (
    <div>
      {/* Top Background */}
      <TopBackground />
      {/* Header */}
      <HeaderContainer />
      
      <div class="container-fluid justify-content-center" style={{paddingTop:"10rem"}}>
        <div class="fs-1 fw-bold text-light text-center">
            Từ Đông Nam Á đến thế giới, trong tầm tay của bạn   
        </div>
      </div>
      <div className="container" style={{height:"100rem"}}>

      </div>  
      {/* Footer */}
      <footer className="bg-light py-3 text-center">
        <p className="mb-0 text-muted">&copy; 2024 Travelowkey. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
