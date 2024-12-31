import React, { useState } from "react";
import QRCodeModal from "./QRCode";
import { loadPaymentURL } from "../services";

const FlightPaymentForm = ({ flight, passengers }) => {
    const [selectedMethod, setSelectedMethod] = useState("atm");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [transactionId, setTransactionId] = useState(null);
    const [error, setError] = useState(null);
    let paymentInfo = {
        'service': 'flight',
        'type': selectedMethod,
        'amount': flight.Price * passengers,
        'info': `${flight.Id}-${passengers}`,
        'extraData': '',
      };

      const handlePayment = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await loadPaymentURL(paymentInfo);
            const transactionId = data.transaction_id;

            if (data.url && data.url !== "QR_code") {
                // Redirect to external URL for payment processing
                window.open(data.url, "_blank");
            } else if (data.url === "QR_code") {
                // Show QR Code for payment
                setTransactionId(transactionId);
                setShowModal(true);
                // alert("Display QR Code here for transaction ID: " + transactionId);
            }

            // Poll for payment status
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
                        // Replace this with navigation logic
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
        <div className="my-4">
            <h5 className="text-secondary">Phương thức thanh toán</h5>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    value="atm"
                    checked={selectedMethod === "atm"}
                    onChange={() => {setSelectedMethod("atm"); paymentInfo.type = "atm";}}
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
                    onChange={() => {setSelectedMethod("qr"); paymentInfo.type = "qr";}}
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
        </div>
    );
};

export default FlightPaymentForm;
