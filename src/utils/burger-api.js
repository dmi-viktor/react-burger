const NORMA_API = 'https://norma.nomoreparties.space/api';

export async function getIngredients() {
    return await fetch(`${NORMA_API}/ingredients`)
        .then(checkReponse);
};

function checkReponse(response) {
    return response.ok ? response.json() : response.json().then((err) => Promise.reject(err));
};

// Создание заказа
export async function createOrder(data) {
    return await fetch(`${NORMA_API}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'authorization': `Bearer ${getCookie("accessToken")}`
        },
        body: JSON.stringify({ ingredients: data })
    }).then(checkReponse);
}

// Восстановление пароля. Отправка кода восстановления пароля по указанному адресу.
export async function restorePassword(email) {
    return await fetch(`${NORMA_API}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ email: email })
    }).then(checkReponse);
}

// Сохранение нового пароля, используя код из письма
export async function saveNewPassword(password, token) {
    return await fetch(`${NORMA_API}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ password: password, token: token })
    }).then(checkReponse);
}

// Регистрация нового пользователя
export async function register(email, password, name) {
    return await fetch(`${NORMA_API}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ email, password, name })
    }).then(checkReponse);
}

// Авторизация зарегистрированного пользователя
export async function authorize(email, password) {
    return await fetch(`${NORMA_API}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ email: email, password: password })
    }).then(checkReponse);
}

// Выход из учетной записи
export async function logout() {
    return await fetchWithRefresh(`${NORMA_API}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ token: localStorage.getItem("refreshToken") })
    });
}


// Получить данные о пользователе
export async function getUserData() {
    return await fetchWithRefresh(`${NORMA_API}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'authorization': `Bearer ${getCookie("accessToken")}`
        }
    });
}

// Обновить данные о пользователе
export async function setUserData(email, password, name) {
    return await fetchWithRefresh(`${NORMA_API}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'authorization': `Bearer ${getCookie("accessToken")}`
        },
        body: JSON.stringify({ email, password, name })
    });
}

// Обновление токена авторизации
export const refreshToken = () => {
    return fetch(`${NORMA_API}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    }).then(checkReponse);
};

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkReponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();

            if (!refreshData.success) {
                Promise.reject(refreshData);
            }

            localStorage.setItem("refreshToken", refreshData.refreshToken);
            setCookie("accessToken", refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkReponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

export function setCookie(name, value, props = {}) {
    props = {
        path: '/',  //задаем корневой адрес для cookies
        ...props
    };

    if (props.expires instanceof Date) {
        props.expires = props.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in props) {
        updatedCookie += "; " + optionKey;
        let optionValue = props[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}