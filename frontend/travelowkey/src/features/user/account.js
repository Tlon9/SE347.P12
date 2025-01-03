export const deleteCookie = async(name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
  };

  // Utility function to get a cookie
export const getCookie = async (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
};

export const refreshToken = async () => {
    const refresh_token = await getCookie('refresh_token');
    if (!refresh_token) {
        alert('Cần đăng nhập lại');
        window.location.href = '/user/login';
        return null;
    }

    const response = await fetch('http://127.0.0.1:8800/api/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({ refresh: refresh_token }),
    });

    if (response.ok) {
        const data = await response.json();
        document.cookie = `access_token=${data.access}; path=/`;
        return data.access;
    } else {
        alert('Cần đăng nhập lại');
        window.location.href = '/user/login';
        return null;
    }
}

export const loadUserInfo = async () => {
    let access_token = await getCookie('access_token');
    let accountInfo = {}
    if (!access_token) {
        alert('Cần đăng nhập');
        window.location.href = '/user/login';
        return;
    }
    const response = await fetch('http://127.0.0.1:8800/user/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
        },
    });

    if (response.status === 200) {
        accountInfo = await response.json();
        accountInfo.email = accountInfo.email || '';
        accountInfo.name = accountInfo.name || '';
        accountInfo.sex = accountInfo.sex || '';
        accountInfo.birthday = accountInfo.birthday || '';
        accountInfo.phone = accountInfo.phone || '';
        accountInfo.nationality = accountInfo.nationality || '';
        accountInfo.nation = accountInfo.nation || '';
        accountInfo.expiration = accountInfo.expiration || '';
        // const newToken = await refreshToken();
        return accountInfo;
    } else if (response.status === 401) {
        alert(response.status);
        const newToken = await refreshToken();
        if (newToken) {
            await loadUserInfo();
        }
    } else {
        alert(response.status);
        alert('Cần đăng nhập lại');
        window.location.href = '/user/login';
    }
}

export const saveUserInfo = async (formData) => {
    let access_token = await getCookie('access_token');
    // alert(JSON.stringify(formData))
    if (!access_token) {
        alert('Cần đăng nhập');
        window.location.href = '/user/login';
        return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:8800/user/updateinfo/", {
        method: "PUT", // Use POST or PUT based on your API
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${access_token}`, // Include the access token for authentication
        },
        body:  JSON.stringify(formData), // Send the updated form data
      });
  
      if (response.ok) {
        const result = await response.json();
        alert("User information saved successfully!");
        console.log("Response:", result);
      } else {
        const errorData = await response.json();
        console.error("Failed to save user info:", errorData);
        alert("Failed to save user information. Please try again.");
      }
    } catch (error) {
      console.error("Error while saving user info:", error);
      alert(error)
      alert("An error occurred. Please try again later.");
    }
};


export const savePasswordInfo = async (formPasswordData) => {
    let access_token = await getCookie('access_token');
    if (!access_token) {
        alert('Cần đăng nhập');
        window.location.href = '/user/login';
        return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:8800/user/updatepassword/", {
        method: "PUT", // Use POST or PUT based on your API
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${access_token}`, // Include the access token for authentication
        },
        body:  JSON.stringify(formPasswordData), // Send the updated form data
      });
  
      if (response.ok) {
        const result = await response.json();
        alert("User password saved successfully!");
        console.log("Response:", result);
      } else {
        const errorData = await response.json();
        console.error("Failed to save user password:", errorData);
        alert("Failed to save user password. Please try again.");
      }
    } catch (error) {
      console.error("Error while saving user password:", error);
      alert(error)
      alert("An error occurred. Please try again later.");
    }
};