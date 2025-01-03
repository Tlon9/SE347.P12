import React, { useState, useEffect } from "react";

const QRCodeModal = ({ transactionId, show, onClose }) => {
    const [loading, setLoading] = useState(true);
    const [qrCode, setQrCode] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQRCode = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `http://127.0.0.1:8080/payment/qr_code?transactionId=${transactionId}&service=qr`
                );
                if (!response.ok) {
                    throw new Error(`Failed to fetch QR code: ${response.status}`);
                }
                const blob = await response.blob();
                setQrCode(URL.createObjectURL(blob));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (transactionId && show) {
            fetchQRCode();
        }
    }, [transactionId, show]);

    if (!show) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Quét QR thanh toán</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body text-center">
                        {loading ? (
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : error ? (
                            <div className="alert alert-danger">{error}</div>
                        ) : (
                            <img
                                src={qrCode}
                                alt="QR Code"
                                style={{ width: "200px", height: "200px" }}
                            />
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={onClose}>
                            Hoàn tất
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRCodeModal;
