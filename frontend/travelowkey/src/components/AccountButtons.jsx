import React from "react";

const AccountButtons = () => {
  return (
    <div className="d-flex gap-2">
      {/* Login Button */}
      <a id="btn-login" className="btn btn-outline-primary d-flex align-items-center gap-1" href="/user/login">
        <ion-icon name="person-outline" className="fs-5"></ion-icon>
        <span>Đăng nhập</span>
      </a>
      
      {/* Signup Button */}
      <a id="btn-signup" className="btn btn-primary d-flex align-items-center" href="/user/signup">
        <span>Đăng ký</span>
      </a>
      
      {/* Account Button */}
      <a id="btn-account" className="btn btn-outline-secondary d-flex align-items-center gap-1" href="/user/account">
        <ion-icon name="person-circle-outline" className="fs-5"></ion-icon>
        <span>Tài khoản</span>
      </a>
    </div>
  );
};

export default AccountButtons;
