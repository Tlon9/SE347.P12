import React, { useState, useEffect } from "react";
import "../styles/carousel.css"; 
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5";

const CarouselComponent = ({useBackground}) => {
  const [items, setItems] = useState([
    { id: 1,  alt: "img 1" },
    { id: 2,  alt: "img 2" },
    { id: 3,  alt: "img 3" },
    { id: 4,  alt: "img 4" },
    { id: 5,  alt: "img 5" },
  ]);

  const rotateRight = () => {
    setItems((prev) => [prev.pop(), ...prev]);
  };

  const rotateLeft = () => {
    setItems((prev) => [...prev.slice(1), prev[0]]);
  };

  useEffect(() => {
    const autoRotate = setInterval(() => {
      rotateRight();
    }, 3000);

    return () => clearInterval(autoRotate);
  }, []);

  return (
    <div className={`container-fluid p-3 ${useBackground ? "bg-primary opacity-75 z-n1" : ""}`}>
      {/* Carousel Container */}
      <div className={`carousel-container mx-auto d-flex align-items-center justify-content-center position-relative pt-5`}>
        {items.map((item, index) => {
          const className = `content-item content-item-${item.id}`;
          return (
            <img
              key={index}
              className={`img-fluid position-absolute ${className}`}
              src={`/assets/images/ad-${index+1}.jpeg`}
              loading="lazy"
              alt={item.alt}
            />
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="carousel__nav d-flex justify-content-center align-items-center mt-5 gap-3">
        <button
          className={`btn ${useBackground? "btn-outline-light" : "btn-outline-primary"} p-0 border-0`}
          onClick={rotateLeft}
          aria-label="Previous"
        >
          <IoArrowBackCircleOutline size={48} />
        </button>

        <span className={`text-uppercase fw-bold ${useBackground ? "text-light" : "text-primary"}`}>Xem thêm khuyến mãi</span>

        <button
          className={`btn ${useBackground? "btn-outline-light" : "btn-outline-primary"} p-0 border-0`}
          onClick={rotateRight}
          aria-label="Next"
        >
          <IoArrowForwardCircleOutline size={48} />
        </button>
      </div>
    </div>
  );
};

export default CarouselComponent;
