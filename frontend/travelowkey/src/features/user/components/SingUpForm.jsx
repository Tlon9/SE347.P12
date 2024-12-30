import React, { useState, useEffect } from "react";
import '../signup.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {submitSignUp} from "../services.js";
const SignUpForm = () => {

    useEffect(() => {
        const initializeForm = async () => {
        };

        initializeForm();
    }, []);
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        retypePassword: '',
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
        const { email, username, password, retypePassword } = formData;

        // Call submit function with form data
        submitSignUp(email, username, password, retypePassword);
    };

    return (
        <div className="container-lg shadow-sm p-5 mt-5 rounded">
            <div className="text-center mb-4">
                <h2 className="fw-bold">Đăng Ký</h2>
            </div>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Nhập email" value={formData.email} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Email</label>
                    <input type="username" className="form-control" id="username" placeholder="Nhập username" value={formData.username} onChange={handleChange}/>
                </div>
                <div className="mb-3 position-relative">
                    <label htmlFor="password" className="form-label">Mật khẩu</label>
                    <input type="password" className="form-control" id="password" placeholder="Nhập mật khẩu" value={formData.password} onChange={handleChange}/>
                </div>
                <div className="mb-3 position-relative">
                    <label htmlFor="retype-password" className="form-label">Xác nhận mật khẩu</label>
                    <input type="password" className="form-control" id="retypePassword" placeholder="Nhập lại mật khẩu" value={formData.retypePassword} onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>Đăng ký</button>
                <p className="text-center mt-3">
                By registering, you agree to our <a href="#">Terms & Conditions</a> and that you have read our <a href="#">Privacy Policy</a>.
                </p>
            </form>
        </div>
    );
};

export default SignUpForm;
