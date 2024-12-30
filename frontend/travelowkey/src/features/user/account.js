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

    const response = await fetch('/user/api/token/refresh/', {
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
    const response = await fetch('http://127.0.0.1:8800/user/info/', {
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
        return accountInfo;
    } else if (response.status === 401) {
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