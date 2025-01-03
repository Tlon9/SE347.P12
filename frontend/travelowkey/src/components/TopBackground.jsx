import React, { useEffect, useState } from "react";

const TopBackground = () => {
  const [currentImage, setCurrentImage] = useState(1);
  const totalImages = 5;
  const imageBasePath = "/assets/images"; // Update this path

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage % totalImages) + 1);
    }, 5000); 

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className="container-fluid p-0">
      <img
        id="background-image"
        className="w-100 h-100 position-absolute top-0 start-0 end-0"
        style={{ zIndex: -10, objectFit: "cover", }}
        src={`${imageBasePath}/background${currentImage}.jpg`}
        alt="Background"
      />
    </div>
  );
};

export default TopBackground;
