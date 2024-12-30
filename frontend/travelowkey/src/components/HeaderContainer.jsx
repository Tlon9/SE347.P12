import React, { useEffect, useState } from "react";
import HeaderNavbar from "./HeaderNavbar";

const Header = ({scrollFlag}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    if (scrollFlag) {
      setIsScrolled(true);
    }
    else {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  
  return (
    <header className={`header-container container-fluid position-fixed ${isScrolled ? "bg-white shadow-sm" : ""}`} style={{zIndex: 1000}}>
      <div className="container d-flex justify-content-between align-items-center pt-2 header__top-content">
        <a className="d-flex align-items-center text-decoration-none" href="/">
          {/* Logo Image */}
          <div className="me-2">
            <img
              className="img-fluid"
              src="/assets/images/logo.png"
              alt="Travelowkey"
              style={{ width: "6rem", height: "auto" }}
            />
          </div>
          {/* Brand Name */}
          <div>
            <p className={`mb-0 fs-2 fw-bold fst-italic ${isScrolled? "text-dark" : "text-light"}`}>Travelowkey</p>
          </div>
        </a>
        <div className="d-flex align-items-center gap-3 top-content__account-btn-group">
          <a
            id="btn-login"
            className={`btn btn-sm status-btn d-flex align-items-center text-decoration-none ${
              isScrolled ? "btn-outline-primary text-dark" : "btn-outline-light text-light"
            } account-btn-group__login-btn`}
            href="/user/login"
          >
            <i className={`bi bi-person me-2 ${isScrolled ? "text-primary" : ""}`}></i>
            <span className={`text fw-bold ${isScrolled ? "text-primary" : ""}`}>Đăng nhập</span>
          </a>
          <a
            id="btn-signup"
            className="btn btn-primary btn-sm d-flex align-items-center text-decoration-none account-btn-group__register-btn"
            href="/user/signup"
          >
            <span className={`text fw-bold`}>Đăng ký</span>
          </a>
          <a
            id="btn-account"
            className="btn btn-default d-flex align-items-center text-decoration-none text-light account-btn-group__account-btn"
            href="/user/account"
          >
            <i className="bi bi-person-circle me-2"></i>
            <span className="text">Tài khoản</span>
          </a>
        </div>
      </div>
      <HeaderNavbar isScrolled={isScrolled} />
    </header>
  );
};

export default Header;

