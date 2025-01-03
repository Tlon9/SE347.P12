import React, { useState, useEffect } from "react";
import "../account.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {deleteCookie, getCookie, refreshToken, loadUserInfo, saveUserInfo, savePasswordInfo} from "../account.js";
import HistoryForm from "../../payment/components/HistoryForm.jsx";

const AccountForm = () => {
  const [activeTab, setActiveTab] = useState("user-pane"); // Current active tab
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    birthDate: "",
    email: "",
    nationality: "",
    phone: "",
    passportNation: "",
    passportExpiry: "",
    score: ""
  });

  const [formPasswordData, setFormPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
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
    const accessToken = await getCookie("access_token");
    const refreshToken = await getCookie("refresh_token");

    if (!accessToken || !refreshToken) {
      alert("You are already logged out.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8800/user/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        deleteCookie("access_token");
        // deleteCookie("refresh_token");
        window.location.href = "/";
      } else {
        const errorData = await response.json();
      console.error("Logout failed:", errorData);
        alert("Failed to log out.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
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


  useEffect(() => {
    const initializeTab = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const nav = urlParams.get("nav");
      if (nav === "bill-pane") {
        setActiveTab("bill-pane");
      } else {
        setActiveTab("user-pane");
        await fetchUserInfo();
      }
    };
  
    initializeTab(); // Call the async function
  }, []);

  // Handles form field changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value, // Remove 'user-txt-' prefix to match state keys
    }));
  };

  const handleInputPasswordChange = (e) => {
    const { id, value } = e.target;
    setFormPasswordData((prevFormPasswordData) => ({
      ...prevFormPasswordData,
      [id]: value
    }));
  }

  // Handles form submission
  const handleFormSave = async () => {
    await saveUserInfo(formData); // Call the save function
  };

  const handleFormPasswordSave = async () => {
    await savePasswordInfo(formPasswordData); // Call the save function
  };

  const handleFormCancel = async () => {
    await fetchUserInfo(); // Call the save function
  };

  const initialPasswordData = {
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  };
  
  const handleFormPasswordCancel = () => {
    setFormPasswordData(initialPasswordData);
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
                            <select id="gender" className="input form-input" value={formData.gender} onChange={handleInputChange}>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </div>
                        <div className="input-block">
                            <div className="title">
                                <div className="text">Ngày sinh:</div>
                            </div>
                            <div className="input-group">
                              <input
                                  id="birthDate"
                                  className="input form-input"
                                  type="date"
                                  value={formData.birthDate}
                                  onChange={handleInputChange}
                              />
                            </div>
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
                            <div className="input-group">
                              <input
                                  id="passportExpiry"
                                  className="input form-input"
                                  type="date"
                                  value={formData.passportExpiry}
                                  onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, passportExpiry: e.target.value }))
                                  }
                              />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btn-container">
                    <button className="btn-default form-btn-save" id="user-btn-save" type="button"  onClick={handleFormSave}>
                        <div className="text">Lưu</div>
                    </button>
                    <button className="btn-default form-btn-reset" id="user-btn-clear" type="button" onClick={handleFormCancel}>
                        <div className="text">Hủy</div>
                    </button>
                </div>
            </form>
            <div class="pane-label">
              <div class="label-text">Bảo mật & Mật khẩu</div>
            </div>
            <form class="info-form" id="password-info-form">
              <div class="form-content">
                <div class="info-col" id="password-info-col">
                  <div class="input-block">
                    <div class="title">
                        <div class="text">
                          Mật khẩu hiện tại:
                        </div>
                    </div>
                    <input class="input form-input" type="password" id="oldPassword" value={formPasswordData.oldPassword} onChange={handleInputPasswordChange}/>
                  </div>
                  <div class="input-block">
                    <div class="title">
                        <div class="text">
                          Mật khẩu mới:
                        </div>
                    </div>
                    <input class="input form-input" type="password" id="newPassword" value={formPasswordData.newPassword} onChange= {handleInputPasswordChange}/>
                  </div>
                  <div class="input-block">
                    <div class="title">
                        <div class="text">Nhập lại mật khẩu mới:</div>
                    </div>
                    <input class="input form-input" type="password" id="newPasswordConfirmation" value={formPasswordData.newPasswordConfirmation} onChange={handleInputPasswordChange}/>
                  </div>
                </div>
              </div>
              <div class="btn-container">
                <button class="btn-default form-btn-save" id="password-btn-save" type="button" onClick={handleFormPasswordSave}>
                  <div class="text">Lưu</div>
                </button>
                <button class="btn-default form-btn-reset" id="password-btn-clear" type="reset" onClick={handleFormPasswordCancel}>
                  <div class="text">Hủy</div>
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
