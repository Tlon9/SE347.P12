import React from "react";
import HeaderContainer from "../../../components/HeaderContainer.jsx";
import Footer from "../../../components/Footer.jsx";
import HistoryForm from "../components/HistoryForm.jsx";

const HistoryPage = () => {
    return (
        <div>
            <HeaderContainer scrollFlag={true} />
            <div className="container-fluid justify-content-center" style={{ paddingTop: "8rem" }}></div>
            <HistoryForm />
            <Footer />
        </div>
    );
};
export default HistoryPage;