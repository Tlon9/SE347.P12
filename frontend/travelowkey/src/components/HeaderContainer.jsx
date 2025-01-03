import React, { useEffect, useState } from "react";
import {deleteCookie, getCookie, refreshToken} from "./HeadContainer.js";
import HeaderNavbar from "./HeaderNavbar";

const Header = ({scrollFlag}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login function adapted for React
  const checkLogin = async () => {
    const accessToken = await getCookie("access_token");
    const refreshToken = await getCookie("refresh_token");
    if (!accessToken) {
      console.log("No access token");
      setIsLoggedIn(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8800/user/check_login/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        console.log("Access token valid");
        setIsLoggedIn(true);
      } else if (response.status === 401) {
        const newAccessToken = await refreshToken();
        if (newAccessToken) {
          checkLogin(); // Retry with the new token
        } else {
          console.log("Refresh token invalid");
          setIsLoggedIn(false);
        }
      } else {
        console.log("Access token invalid");
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error during login check:", error);
      setIsLoggedIn(false);
    }
  };
  
  useEffect(() => {
    checkLogin();
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
          {/* <a
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
          </a> */}
          {!isLoggedIn ? (
            <>
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
                <span className="text fw-bold">Đăng ký</span>
              </a>
            </>
          ) : (
            <a
              id="btn-account"
              className={`btn btn-sm status-btn d-flex align-items-center text-decoration-none ${
                isScrolled ? "btn-outline-dark" : "btn-outline-light"
              } account-btn-group__account-btn`}
              href="/user/account"
            >
              <i className="bi bi-person-circle me-2"></i>
              <span className={`text fw-bold ${isScrolled ? "text-dark" : "text-light"}`}>Tài khoản</span>
            </a>
          )}
        </div>
      </div>
      <HeaderNavbar isScrolled={isScrolled} />
    </header>
  );
};

export default Header;

