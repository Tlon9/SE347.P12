import React, { useState } from "react";
import QRCodeModal from "./QRCode";
import { loadPaymentURL } from "../services";


const HotelPaymentForm = ({ hotel, room, checkInDate, checkOutDate }) => {
    const [selectedMethod, setSelectedMethod] = useState("atm");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [transactionId, setTransactionId] = useState(null);
    const [error, setError] = useState(null);

    const stayDuration = Math.max(
        (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24),
        1
    );

    let paymentInfo = {
        service: "hotel",
        type: selectedMethod,
        amount: room.price * stayDuration,
        info: `${hotel.id_hotel}_${room.room_id}_${checkInDate}_${checkOutDate}`,
        extraData: "",
    };

    const handlePayment = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await loadPaymentURL(paymentInfo);
            const transactionId = data.transaction_id;

            if (data.url && data.url !== "QR_code") {
                window.open(data.url, "_blank");
            } else if (data.url === "QR_code") {
                // alert("Display QR Code for transaction ID: " + transactionId);
                setTransactionId(transactionId);
                setShowModal(true);
            }

            let trialCount = 0;
            const pollStatus = setInterval(async () => {
                trialCount++;
                if (trialCount > 2) {
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
                        alert("Payment successful! Redirecting to invoice...");
                        window.location.href = `/invoice?transactionId=${transactionId}&service=hotel`;
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
        <div className="my-4">
            <h5 className="text-secondary">Phương thức thanh toán</h5>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    value="atm"
                    checked={selectedMethod === "atm"}
                    onChange={() => { setSelectedMethod("atm"); paymentInfo.type = "atm"; }}
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
                    onChange={() => { setSelectedMethod("qr"); paymentInfo.type = "qr"; }}
                />
                <label className="form-check-label">QR Code</label>
            </div>
            <QRCodeModal
                transactionId={transactionId}
                show={showModal}
                onClose={() => setShowModal(false)}
            />
            <button
                className="btn btn-success mt-4"
                onClick={handlePayment}
                disabled={loading}
            >
                {loading ? "Processing..." : "Thanh toán"}
            </button>
            {error && <div className="text-danger mt-2">{error}</div>}
        </div>
    );
};

export default HotelPaymentForm;
