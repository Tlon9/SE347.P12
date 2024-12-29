export const submitSignUp = (email, username, password, retypePassword) => {
    // Simple email validation using regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === "") {
        alert("Vui lòng nhập email");
        return;
    }
    if (username === "") {
        alert("Vui lòng username");
        return;
    }
    if (!emailRegex.test(email)) {
        alert("Vui lòng nhập một email hợp lệ");
        return;
    }
    if (password === "") {
        alert("Vui lòng nhập mật khẩu");
        return;
    }
    if (retypePassword === "") {
        alert("Vui lòng nhập lại mật khẩu");
        return;
    }
    if (password !== retypePassword) {
        alert("Sai mật khẩu nhập lại");
        return;
    }

    // Call the API to create the user
    fetch('http://127.0.0.1:8800/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "User registered successfully.") {
            alert("Tạo tài khoản thành công");
            setTimeout(() => {
                // Redirect after success
                window.location.href = "/user/login";
            }, 1000);
        } else {
            alert("Tạo tài khoản thất bại");
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Đã có lỗi xảy ra. Vui lòng thử lại.");
    });
};
