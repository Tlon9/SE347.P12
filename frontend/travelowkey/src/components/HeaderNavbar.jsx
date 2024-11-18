import React from "react";

const HeaderNavbar = () => {
  const navItems = [
    { text: "Vé máy bay", link: "/flight/search" },
    { text: "Xe khách", link: "/bus/search" },
    { text: "Xe dịch vụ", link: "/transfer/search" },
    { text: "Khách sạn", link: "/hotel/search" },
  ];

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <div className="navbar-nav">
          {navItems.map((item, index) => (
            <a key={index} className="nav-link" href={item.link}>
              {item.text}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default HeaderNavbar;
