import React, { useState, useEffect } from "react";
import "../account.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {deleteCookie, getCookie, refreshToken, loadUserInfo} from "../account.js";
import HistoryForm from "../../payment/components/HistoryForm.jsx";

const AccountForm = () => {
  const [activeTab, setActiveTab] = useState("user-pane"); // Current active tab
  const [formData, setFormData] = useState({
    name: "",
    gender: "Male",
    birthDate: "",
    email: "",
    nationality: "",
    phone: "",
    passportNation: "",
    passportExpiry: "",
    score: ""
  });

  // Handles tab navigation
  const navigateTab = async (tabId) => {
    if (tabId === "btn-account-user") {
      setActiveTab("user-pane");
      await fetchUserInfo();
    } else if (tabId === "btn-account-bill") {
      setActiveTab("bill-pane");
    } else if (tabId === "btn-account-logout") {
      handleLogout();
    }
  };

  // Handles logout functionality
  const handleLogout = async () => {
    const accessToken = getCookie("access_token");
    const refreshToken = getCookie("refresh_token");

    try {
      const response = await fetch("/user/api/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        deleteCookie("access_token");
        window.location.href = "/";
      } else {
        alert("Failed to log out.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const userInfo = await loadUserInfo();
      if (userInfo) {
        setFormData({
          name: userInfo.name,
          gender: userInfo.sex || "Male",
          birthDate: userInfo.birthday,
          email: userInfo.email,
          nationality: userInfo.nationality,
          phone: userInfo.phone,
          passportNation: userInfo.nation,
          passportExpiry: userInfo.expiration,
          score: userInfo.score
        });
      }
    } catch (error) {
      console.error("Failed to load user info:", error);
    }
  };


  // Synchronizes the active tab with the URL query parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const nav = urlParams.get("nav");
    if (nav === "bill-pane") {
      setActiveTab("bill-pane");
    } else {
      setActiveTab("user-pane");
    }
  }, []);

  // Handles form field changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value, // Remove 'user-txt-' prefix to match state keys
    }));
  };

  // Handles form submission
  const handleFormSave = () => {
    console.log("Form data submitted:", formData);
    // Add form submission logic here (e.g., API call)
  };

  return (
    <div className="container account-content-container">
      <div className="account-navbar">
        <div className="nav-tab-group">
          <button
            type="button"
            className={`btn-default nav-tab ${activeTab === "user-pane" ? "active" : ""}`}
            onClick={() => navigateTab("btn-account-user")}
          >
            <i className="bi bi-gear"></i>
            <div className="text">Tài khoản</div>
          </button>
          <button
            type="button"
            className={`btn-default nav-tab ${activeTab === "bill-pane" ? "active" : ""}`}
            onClick={() => navigateTab("btn-account-bill")}
          >
            <i className="bi bi-receipt"></i>
            <div className="text">Lịch sử giao dịch</div>
          </button>
          <button
            type="button"
            className="btn-default nav-tab"
            onClick={() => navigateTab("btn-account-logout")}
          >
            <i className="bi bi-box-arrow-right"></i>
            <div className="text">Đăng xuất</div>
          </button>
        </div>
      </div>
      <div className="account-content-window">
        {/* User Information Pane */}
        {activeTab === "user-pane" && (
          <div className="account-content-pane" id="user-pane">
            <div className="pane-label d-flex justify-content-between">
                <div className="label-text">Thông tin cá nhân</div>
                <div className="label-score fw-bold text-secondary">Điểm thưởng: {formData.score}</div>
            </div>
            <form className="info-form" id="user-info-form">
                <div id="warning-auth">
                    <div className="text">Nhập thông tin cá nhân cho tài khoản để có thể thanh toán</div>
                </div>
                <div className="form-content">
                    <div className="info-col" id="user-info-col-1">
                        <div className="input-block">
                            <div className="title">
                                <div className="text">Họ tên:</div>
                            </div>
                            <input className="input form-input" type="text" id="name" value={formData.name} onChange={handleInputChange}/>
                        </div>
                        <div className="input-block">
                            <div className="title">
                                <div className="text">Giới tính:</div>
                            </div>
                            <select id="gender" className="input form-input">
                                <option value="Male">Nam</option>
                                <option value="Female">Nữ</option>
                            </select>
                        </div>
                        <div className="input-block">
                            <div className="title">
                                <div className="text">Ngày sinh:</div>
                            </div>
                            <input className="input form-input" type="date" id="birthDate" value={formData.birthDate} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className="info-col" id="user-info-col-2">
                        <div className="input-block">
                            <div className="title">
                                <div className="text">Email:</div>
                            </div>
                            <input className="input form-input" type="text" id="email" value={formData.email} onChange={handleInputChange}/>
                        </div>
                        <div className="input-block">
                            <div className="title">
                                <div className="text">Quốc tịch:</div>
                            </div>
                            <input className="input form-input" type="text" id="nationality" value={formData.nationality} onChange={handleInputChange}/>
                        </div>
                        <div className="input-block">
                            <div className="title">
                                <div className="text">SĐT:</div>
                            </div>
                            <input className="input form-input" type="text" id="phone" value={formData.phone} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className="info-col" id="user-info-col-3">
                        <div className="input-block">
                            <div className="title">
                                <div className="text">Quốc gia cấp hộ chiếu:</div>
                            </div>
                            <input className="input form-input" type="text" id="passportNation" value={formData.passportNation} onChange={handleInputChange}/>
                        </div>
                        <div className="input-block">
                            <div className="title">
                                <div className="text">Ngày hết hạn hộ chiếu:</div>
                            </div>
                            <input className="input form-input" type="date" id="passportExpiry" value={formData.passportExpiry} onChange={handleInputChange}/>
                        </div>
                    </div>
                </div>
                <div className="btn-container">
                    <button className="btn-default form-btn-save" id="user-btn-save" type="button">
                        <div className="text">Lưu</div>
                    </button>
                    <button className="btn-default form-btn-reset" id="user-btn-clear" type="button">
                        <div className="text">Hủy</div>
                    </button>
                </div>
            </form>
          </div>
        )}

        {/* Bill History Pane */}
        {activeTab === "bill-pane" && (
          <div className="account-content-pane">
            {/* <h3>Lịch sử thanh toán</h3> */}
            <div id="bill-container">
              <HistoryForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountForm;
