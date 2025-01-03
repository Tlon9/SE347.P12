import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const InvoiceForm = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const transactionId = searchParams.get("transactionId");
    const service = searchParams.get("service");
    const [transaction, setTransaction] = useState(null);
    const [details, setDetails] = useState(null);
    const [qrCode, setQrCode] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch transaction details
                const transactionResponse = await fetch(
                    `http://127.0.0.1:8080/payment/transaction/${transactionId}`
                );
                if (!transactionResponse.ok) {
                    throw new Error("Failed to fetch transaction details");
                }
                const transactionData = await transactionResponse.json();
                setTransaction(transactionData);

                // Fetch specific service details
                let detailsUrl = "";
                if (service === "flight") {
                    const flightId = transactionData.info.split("-")[0];
                    detailsUrl = `http://127.0.0.1:8000/flights/getFlight?id=${flightId}`;
                } else if (service === "hotel") {
                    const roomId = transactionData.info.split("_")[1];
                    detailsUrl = `http://127.0.0.1:8008/hotels/getRoom?room_id=${roomId}`;
                }
                const detailsResponse = await fetch(detailsUrl);
                if (!detailsResponse.ok) {
                    throw new Error("Failed to fetch service details");
                }
                const detailsData = await detailsResponse.json();
                setDetails(detailsData);

                // Fetch QR Code
                const qrResponse = await fetch(
                    `http://127.0.0.1:8080/payment/qr_code?transactionId=${transactionId}&service=${service}`
                );
                if (!qrResponse.ok) {
                    throw new Error("Failed to fetch QR code");
                }
                const qrBlob = await qrResponse.blob();
                setQrCode(URL.createObjectURL(qrBlob));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [transactionId, service]);

    const formatMoney = (amount) =>
        new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);

    if (loading) {
        return (
            <div className="text-center my-3">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    return (
        <div className="container my-4 d-flex flex-column" style={{ maxWidth: "40rem" }}>
            <div className="card shadow p-3">
                <h4 className="text-primary mb-3">Thông tin hóa đơn</h4>
                {service === "flight" && details && (
                    <div>
                        <p>
                            <strong>Từ:</strong> {details.From}
                        </p>
                        <p>
                            <strong>Đến:</strong> {details.To}
                        </p>
                        <p>
                            <strong>Ngày đi:</strong> {details.Date}
                        </p>
                        <p>
                            <strong>Giờ:</strong> {details.DepartureTime}
                        </p>
                        <p>
                            <strong>Hạng ghế:</strong> {details.SeatClass}
                        </p>
                    </div>
                )}
                {service === "hotel" && details && (
                    <div>
                        <p>
                            <strong>Tên phòng:</strong> {details.Name}
                        </p>
                        <p>
                            <strong>Từ ngày:</strong> {transaction.info.split("_")[2]}
                        </p>
                        <p>
                            <strong>Đến ngày:</strong> {transaction.info.split("_")[3]}
                        </p>
                    </div>
                )}
                {transaction && (
                    <div>
                        <p>
                            <strong>Mã giao dịch:</strong> {transactionId}
                        </p>
                        <p>
                            <strong>Ngày thanh toán:</strong> {new Date(transaction.created_at).toLocaleString("vi-VN")}
                        </p>
                        <p>
                            <strong>Tổng tiền:</strong>{" "}
                            <span className="text-danger fw-bold">
                                {formatMoney(transaction.amount)}
                            </span>
                        </p>
                    </div>
                )}
                {qrCode && (
                    <div className="text-center my-3">
                        <img
                            src={qrCode}
                            alt="QR Code"
                            style={{ width: "200px", height: "200px" }}
                        />
                    </div>
                )}
            </div>
            <button
                className="btn btn-primary mt-4 align-self-center"
                onClick={() => navigate("/")}
                style={{ maxWidth: "20rem" }}
            >
                Trở về trang chủ
            </button>
        </div>
    );
};

export default InvoiceForm;
