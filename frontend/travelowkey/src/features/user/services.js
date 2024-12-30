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
            'X-CSRFToken': csrftoken
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

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');


export const submitLogin = (email,password) => {
    // Simple email validation using regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === "") {
        alert("Vui lòng nhập email");
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

    // Call the API to create the user
    fetch('http://127.0.0.1:8800/api/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.access && data.refresh) {
            alert("Đăng nhập thành công");
            setTimeout(() => {
                document.cookie = `access_token=${data.access}; path=/;`;
                document.cookie = `refresh_token=${data.refresh}; path=/;`;
                console.log('from login'+ getCookie('access_token'));
                console.log('from login'+ getCookie('refresh_token'));
                window.location.href = "/";
            }, 1000);
        } else {
            alert(data.statusCode);
            alert("Đăng nhập thất bại");
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Đã có lỗi xảy ra. Vui lòng thử lại.");
    });
};

