import React from "react";

const Logo = () => {
  return (
    <a className="d-flex align-items-center text-decoration-none" href="/">
      {/* Logo Image */}
      <div className="me-2">
        <img
          className="img-fluid"
          src="/assets/images/logo.png"
          alt="Travelowkey"
          style={{ width: "50px", height: "auto" }}
        />
      </div>
      {/* Brand Name */}
      <div>
        <p className="mb-0 fw-bold text-dark">Travelowkey</p>
      </div>
    </a>
  );
};

export default Logo;
