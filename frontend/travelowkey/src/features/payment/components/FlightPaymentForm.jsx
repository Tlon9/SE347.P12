import React, { useState, useEffect } from "react";
import QRCodeModal from "./QRCode";
import { loadPaymentURL, fetchUserScore } from "../services";
import { use } from "react";

const FlightPaymentForm = ({ flight, passengers, onAmountChange }) => {
    const [selectedMethod, setSelectedMethod] = useState("atm");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [transactionId, setTransactionId] = useState(null);
    const [error, setError] = useState(null);
    const [useScore, setUseScore] = useState(false);
    const [score, setScore] = useState(0);
    const [amount, setAmount] = useState(flight.Price * passengers);

    // Fetch user score
    useEffect(() => {
        const fetchScore = async () => {
            try {
                const response = await fetchUserScore();
                
                if (response !== null) {
                    setScore(response.score);
                }
            } catch (error) {
                console.error("Failed to fetch score:", error);
            }
        };
        fetchScore();
    }, []);

    // Update amount when useScore changes
    useEffect(() => {
        if (useScore) {
            setAmount(Math.max(0, flight.Price * passengers - score * 100));
        } else {
            setAmount(flight.Price * passengers);
        }
    
        // Notify parent about the amount change
        onAmountChange(amount);
    }, [useScore, flight.Price, passengers, score, onAmountChange, amount]);

    const paymentInfo = {
        service: "flight",
        type: selectedMethod,
        amount: amount,
        info: `${flight.Id}-${passengers}`,
        extraData: "",
    };

    const handlePayment = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await loadPaymentURL(paymentInfo,useScore);
            const transactionId = data.transaction_id;

            if (data.url && data.url !== "QR_code") {
                window.open(data.url, "_blank");
            } else if (data.url === "QR_code") {
                setTransactionId(transactionId);
                setShowModal(true);
            }

            let trialCount = 0;
            const pollStatus = setInterval(async () => {
                trialCount++;
                if (trialCount > 3) {
                    clearInterval(pollStatus);
                    setError("Payment polling timed out.");
                    return;
                }

                const statusResponse = await fetch(
                    `http://127.0.0.1:8080/payment/status/${transactionId}/`
                );
                const statusData = await statusResponse.json();
                const status = statusData.status;

                if (status !== "PENDING") {
                    clearInterval(pollStatus);

                    if (status === "SUCCESS") {
                        alert("Thanh toán thành công! Bạn sẽ được chuyển đến trang xem hóa đơn chi tiết...");
                        window.location.href = `/invoice?transactionId=${transactionId}&service=${paymentInfo.service}`;
                    } else {
                        setError("Payment failed.");
                    }
                }
            }, 5000);
        } catch (error) {
            console.error("Payment failed:", error);
            setError(error.message || "An error occurred during payment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        // <div className="container d-flex justify-content-center">
            <div className="my-4 justify-content-center d-flex flex-column">
                <h5 className="text-primary">Phương thức thanh toán</h5>
                <div className="bg-white shadow p-3 rounded">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            value="atm"
                            checked={selectedMethod === "atm"}
                            onChange={() => setSelectedMethod("atm")}
                        />
                        <label className="form-check-label">ATM Card Payment</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            value="qr"
                            checked={selectedMethod === "qr"}
                            onChange={() => setSelectedMethod("qr")}
                        />
                        <label className="form-check-label">QR Code</label>
                    </div>

                    <div className="form-check mt-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={useScore}
                            onChange={(e) => setUseScore(e.target.checked)}
                        />
                        <label className="form-check-label">
                            Sử dụng điểm để thanh toán ({score} điểm)
                        </label>
                    </div>

                    <QRCodeModal
                        transactionId={transactionId}
                        show={showModal}
                        onClose={() => setShowModal(false)}
                    />

                    {/* <p className="text-danger mt-3">
                        Tổng tiền: {amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                    </p> */}

                    {error && <p className="text-danger">{error}</p>}
                </div>

                <button
                    className="btn btn-secondary fw-bold text-white align-self-center mt-3"
                    onClick={handlePayment}
                    disabled={loading}
                    style={{ maxWidth: "10rem" }}
                >
                    {loading ? "Processing..." : "Thanh toán"}
                </button>
            </div>
        // </div>
    );
};

export default FlightPaymentForm;
