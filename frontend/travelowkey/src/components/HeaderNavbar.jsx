import React, { useState } from "react";

const HeaderNavbar = ({ isScrolled }) => {
  // Initialize hover state for each div using an array
  const [hoverStates, setHoverStates] = useState([false, false, false, false]);

  const handleMouseOver = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = true;
    setHoverStates(newHoverStates);
  };

  const handleMouseOut = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = false;
    setHoverStates(newHoverStates);
  };

  const navItems = [
    { href: "/flight/search", label: "Vé máy bay" },
    { href: "/hotel/search", label: "Khách sạn" },
    { href: "/bus/search", label: "Xe khách" },
    { href: "/transfer/search", label: "Xe dịch vụ" },
  ];

  return (
    <nav
      className={`container d-flex align-items-center gap-3 py-2 ${
        isScrolled ? "navbar-light" : "navbar-dark"
      }`}
    >
      {navItems.map((item, index) => (
        <div
          key={index}
          className="rounded"
          onMouseOver={() => handleMouseOver(index)}
          onMouseOut={() => handleMouseOut(index)}
          style={{
            background: hoverStates[index] ? "rgba(0, 0, 0, 0.2)" : "",
          }}
        >
          <a
            className="d-flex justify-content-center align-items-center text-decoration-none text-white rounded px-5 py-3"
            href={item.href}
          >
            <div
              className={`text-center fw-bold fs-6 flex-grow-1 ${
                isScrolled ? "text-dark" : ""
              }`}
            >
              {item.label}
            </div>
          </a>
        </div>
      ))}
    </nav>
  );
};

export default HeaderNavbar;
