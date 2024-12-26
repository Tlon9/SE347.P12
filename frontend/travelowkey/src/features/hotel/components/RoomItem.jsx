import React from "react";
import PropTypes from "prop-types";

const RoomItems = ({ rooms }) => {
  const changeMoneyFormat = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  if (!rooms || rooms.length === 0) {
    return <div className="title">Không tìm thấy khách sạn phù hợp</div>;
  }

  return (
    <div id="room-container" className="container">
        {rooms.map((room) => (
            <div
            key={room.Id}
            id={`room-item-${room.Id}`}
            className="result-item mb-3 p-2 border rounded shadow d-flex align-items-center"
            >
                {/* Left: Image */}
                {/* <div className="room-photo me-3" style={{ width: "50%" }}>
                    <img
                    src={room.Img}
                    alt={room.Name}
                    className="img-fluid rounded"
                    style={{
                        width: "100%",
                        height: "100%", // Adjust height as needed
                        objectFit: "cover",
                    }}
                    />
                </div> */}
                <div className="room-photo me-3" style={{ width: "50%" }}>
                    <div className="main-image">
                        <img
                            src={room.Img[0]} // Main image
                            alt={room.Name}
                            className="img-fluid rounded"
                            style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "cover",
                            }}
                        />
                    </div>
                    <div className="thumbnail-gallery d-flex mt-2">
                        {room.Img.slice(1, room.Img.length).map((image, index) => (
                            <div
                            key={index}
                            className="thumbnail-wrapper"
                            style={{ flex: "1", padding: "0 4px" }} // Equal flex basis and padding
                            >
                                <img
                                    src={image}
                                    alt={`${room.Name} Thumbnail ${index + 1}`}
                                    className="img-fluid rounded"
                                    style={{
                                    width: "100%", // Fill container width
                                    height: "60px", // Adjust height to your preference
                                    objectFit: "cover", // Ensures the image fits squarely
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: room Details */}
                <div className="room-details w-100">
                    <h5 className="room-name fw-bold" style={{ fontSize: "1rem" }}>
                    {room.Name}
                    </h5>
                    <div
                    className="room-address mb-1 text-muted"
                    style={{ fontSize: "0.9rem" , maxWidth: "300px", wordWrap: "break-word",whiteSpace: "pre-line"}}
                    >
                        Tiện ích <br />
                        {room.Service}
                    </div> 
                    <div
                    className="room-price text-end"
                    style={{ fontSize: "0.9rem", lineHeight: "1rem" }}
                    >
                        <div className="price-text fw-bold">{changeMoneyFormat(room.Price)}</div>
                    </div>
                    <div className="row mt-2">
                        <div className="col d-flex justify-content-end">
                            <button
                            className="btn btn-secondary text-white"
                            style={{ fontSize: "0.9rem", width: "100px" }}
                            >
                            Chọn
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
  );
};

// RoomItems.propTypes = {
//   rooms: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       photo: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       service: PropTypes.string.isRequired,
//       price: PropTypes.number.isRequired,
//     })
//   ).isRequired,
// };

export default RoomItems;
