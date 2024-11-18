import React from "react";
import HeaderContainer from "../components/HeaderContainer";
import HeaderNavbar from "../components/HeaderNavbar";
import Slogan from "../components/Slogan";

const Homepage = () => {
  return (
    <div>
      {/* Header */}
      <HeaderContainer />

      {/* Footer */}
      <footer className="bg-light py-3 text-center">
        <p className="mb-0 text-muted">&copy; 2024 Travelowkey. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
