import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderContainer from "../../../components/HeaderContainer";
import Footer from "../../../components/Footer";
import InvoiceForm from "../components/InvoiceForm.jsx";

const InvoiceScreen = () => {
    return (
        <div className="bg-light">
            <HeaderContainer scrollFlag={true} />
            <div className="container-fluid justify-content-center" style={{ paddingTop: "10rem" }}></div>
            <div className="container">
                <h4 className="text-primary">Chi tiết hóa đơn thanh toán</h4>
                <InvoiceForm />
            </div>
            <div className="container-fluid justify-content-center" style={{ paddingTop: "8rem" }}></div>
            <Footer />
        </div>
    );
};

export default InvoiceScreen;
