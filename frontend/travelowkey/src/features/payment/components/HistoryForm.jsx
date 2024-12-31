import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { loadPaymentHistory } from "../services";

const HistoryPage = () => {
    const [loading, setLoading] = useState(true);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            setLoading(true);
            try {
                const data = await loadPaymentHistory();
                setPaymentHistory(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentHistory();
    }, []);

    const handleItemClick = (transactionId, service) => {
        navigate("/invoice?transactionId=" + transactionId + "&service=" + service);
    };

    const renderPaymentHistoryList = (history) => {
        return history.map((payment, index) => (
            <div className="card shadow-sm mb-3" key={index}>
                <div className="card-body">
                    <h5 className="card-title">
                        {payment.service.toUpperCase()} Booking
                    </h5>
                    <p className="card-text">
                        <strong>Phương thức thanh toán:</strong> {payment.type.toUpperCase()}
                    </p>
                    <p className="card-text">
                        <strong>Ngày tạo:</strong>{" "}
                        {new Date(payment.created_at).toLocaleString("vi-VN")}
                    </p>
                    <p className="card-text">
                        <strong>Trạng thái:</strong>{" "}
                        <span
                            style={{
                                color:
                                    payment.status.toLowerCase() === "pending"
                                        ? "orange"
                                        : payment.status.toLowerCase() === "failed"
                                        ? "red"
                                        : "green",
                            }}
                        >
                            {payment.status.toUpperCase()}
                        </span>
                    </p>
                    <p className="card-text text-end text-danger fw-bold">
                        {payment.amount.toLocaleString()} VND
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={() => handleItemClick(payment._id, payment.service)}
                    >
                        Xem chi tiết
                    </button>
                </div>
            </div>
        ));
    };

    return (
        <div className="container my-4">
            <h4 className="text-primary mb-4">Lịch sử thanh toán</h4>
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : error ? (
                <div className="alert alert-danger text-center">{error}</div>
            ) : paymentHistory.length > 0 ? (
                renderPaymentHistoryList(paymentHistory)
            ) : (
                <div className="text-center text-secondary">
                    Không có lịch sử thanh toán nào.
                </div>
            )}
        </div>
    );
};

export default HistoryPage;
