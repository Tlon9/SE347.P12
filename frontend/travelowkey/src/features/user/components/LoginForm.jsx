import React, { useState, useEffect } from "react";
import {submitLogin} from "../services.js";
const LoginForm = () => {

    useEffect(() => {
        const initializeForm = async () => {
        };

        initializeForm();
    }, []);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,  // Dynamically updates the form data by input field id
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent page reload on form submission
        const {email,  password} = formData;

        // Call submit function with form data
        submitLogin(email, password);
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
                        Email
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Nhập email"
                        value={formData.email}
                        onChange={handleChange}
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
                        id="password"
                        placeholder="Nhập mật khẩu"                       
                        value={formData.password}
                        onChange={handleChange}
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
                    <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>
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
