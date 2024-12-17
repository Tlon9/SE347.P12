import React from "react";
// import "../styles/HeaderNavbar.css"; // Include your custom styles

const HeaderNavbar = ({ isScrolled }) => {
  return (
    <nav className={`container d-flex align-items-center gap-3 py-2 ${
      isScrolled ? "navbar-light" : "navbar-dark"
    }`}>
      <a
        className="d-flex justify-content-center align-items-center text-decoration-none text-white rounded px-5 py-3"
        href="/flight/search"
        // style={{ width: "18rem", height: "5.5rem" }}
      >
        <div className={`text-center fw-bold fs-6 flex-grow-1 ${isScrolled ? "text-dark" : ""}`}>Vé máy bay</div>
      </a>
      <a
        className="d-flex justify-content-center align-items-center text-decoration-none text-white rounded px-5 py-3"
        href="/bus/search"
        // style={{ width: "18rem", height: "5.5rem" }}
      >
        <div className={`text-center fw-bold fs-6 flex-grow-1 ${isScrolled ? "text-dark" : ""}`}>Xe khách</div>
      </a>
      <a
        className="d-flex justify-content-center align-items-center text-decoration-none text-white rounded px-5 py-3"
        href="/transfer/search"
        // style={{ width: "18rem", height: "5.5rem" }}
      >
        <div className={`text-center fw-bold fs-6 flex-grow-1 ${isScrolled ? "text-dark" : ""}`}>Xe dịch vụ</div>
      </a>
      <a
        className="d-flex justify-content-center align-items-center text-decoration-none text-white rounded px-5 py-3"
        href="/hotel/search"
        // style={{ width: "18rem", height: "5.5rem" }}
      >
        <div className={`text-center fw-bold fs-6 flex-grow-1 ${isScrolled ? "text-dark" : ""}`}>Khách sạn</div>
      </a>
    </nav>
  );
};

export default HeaderNavbar;

