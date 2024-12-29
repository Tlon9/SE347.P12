import React, { useState, useEffect } from "react";
// import {getToday, fetchLocations} from "../services.js";
const LoginForm = () => {

  useEffect(() => {
    const initializeForm = async () => {
    };

    initializeForm();
  }, []);


  const handleSubmit = () => {
    // const { departure, destination, departureDate } = formData;

    // if (!departure || !destination) {
    //   alert("Both departure and destination are required.");
    //   return;
    // }
    // if (departure === destination) {
    //   alert("Departure and destination must be different.");
    //   return;
    // }
    // const passengerCount = passengerInfo.adult + passengerInfo.child + passengerInfo.baby;

    // Redirect logic here
    // window.location.href = `/flight/result?from=${departure}&to=${destination}&date=${departureDate}&seatType=${seatType}&passengerCount=${passengerCount}`;
  };

  return (
    <div className="container my-5">
        <div className="d-flex justify-content-center">
            <div className="card shadow-sm p-4" style={{ maxWidth: '400px', width: '100%', maxHeight: '700px' }}>
                <div className="text-center mb-4">
                    <h4>Đăng Nhập</h4>
                </div>
                <form>
                    <div className="mb-3">
                    <label htmlFor="txt-email" className="form-label">
                        Email/Số điện thoại di động
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="txt-email"
                        placeholder="Nhập email"
                    />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="txt-password" className="form-label">
                        Mật khẩu
                    </label>
                    <div className="input-group">
                        <input
                        type="password"
                        className="form-control"
                        id="txt-password"
                        placeholder="Nhập mật khẩu"
                        />
                    </div>
                    </div>
                    <div className="form-check mb-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="login-password-remember"
                    />
                    <label className="form-check-label" htmlFor="login-password-remember">
                        Ghi nhớ mật khẩu
                    </label>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                    Đăng nhập
                    </button>
                    <div className="text-center mt-3">
                    <a href="../user/signup" className="text-decoration-none">
                        Đăng ký tài khoản
                    </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default LoginForm;
