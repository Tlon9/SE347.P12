import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import AccountButtons from "./AccountButtons";
import HeaderNavbar from "./HeaderNavbar";
import Slogan from "./Slogan";

const HeaderContainer = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* Background for Header */}
      <div className="bg-primary py-1"></div>

      {/* Header */}
      <header className={`sticky-top bg-white shadow-sm ${scrolled ? "header-scrolled" : ""}`}>
        <div className="container d-flex justify-content-between align-items-center py-2">
          <Logo />
          <AccountButtons />
        </div>
        <HeaderNavbar />
      </header>

      {/* Slogan */}
      <Slogan />
    </div>
  );
};

export default HeaderContainer;
