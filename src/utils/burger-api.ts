import {
    TIngredient,
    TIngredientsData,
    TResponseOrder,
    TPasswordRecovery,
    TSuccessfulRegistration,
    TSuccessfulAuthorization,
    TSuccessfulLogout,
    TSuccessfulProfile,
    TSuccessfulTokenRefresh
} from './types'

const NORMA_API = 'https://norma.nomoreparties.space/api';

export const ORDER_FEED_URL = 'wss://norma.nomoreparties.space/orders/all';

export const getOrderHistoryURL = (): String => {
    return `wss://norma.nomoreparties.space/orders?token=${getCookie("accessToken")}`;
}

function checkReponse<T>(response: Response): Promise<T> {
    return response.ok ? response.json() : response.json().then((err) => Promise.reject(err));
};

// Получить ингредиенты
export async function getIngredients(): Promise<TIngredientsData> {
    return await fetch(`${NORMA_API}/ingredients`)
        .then((res) => checkReponse<TIngredientsData>(res));
};

// Создание заказа
export async function createOrder(data: string[]): Promise<TResponseOrder> {
    return await fetch(`${NORMA_API}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'authorization': `Bearer ${getCookie("accessToken")}`
        },
        body: JSON.stringify({ ingredients: data })
    }).then((res) => checkReponse<TResponseOrder>(res));
}

// Восстановление пароля. Отправка кода восстановления пароля по указанному адресу.
export async function restorePassword(email: string): Promise<TPasswordRecovery> {
    return await fetch(`${NORMA_API}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ email: email })
    }).then((res) => checkReponse<TPasswordRecovery>(res));
}

// Сохранение нового пароля, используя код из письма
export async function saveNewPassword(password: string, token: string): Promise<TPasswordRecovery> {
    return await fetch(`${NORMA_API}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ password: password, token: token })
    }).then((res) => checkReponse<TPasswordRecovery>(res));
}

// Регистрация нового пользователя
export async function register(email: string, password: string, name: string): Promise<TSuccessfulRegistration> {
    return await fetch(`${NORMA_API}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ email, password, name })
    }).then((res) => checkReponse<TSuccessfulRegistration>(res));
}

// Авторизация зарегистрированного пользователя
export async function authorize(email: string, password: string): Promise<TSuccessfulAuthorization> {
    return await fetch(`${NORMA_API}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ email: email, password: password })
    }).then((res) => checkReponse<TSuccessfulAuthorization>(res));
}

// Выход из учетной записи
export async function logout(): Promise<TSuccessfulLogout> {
    return await fetchWithRefresh<TSuccessfulLogout>(`${NORMA_API}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ token: localStorage.getItem("refreshToken") })
    });
}

// Получить данные о пользователе
export async function getUserData(): Promise<TSuccessfulProfile> {
    return await fetchWithRefresh<TSuccessfulProfile>(`${NORMA_API}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'authorization': `Bearer ${getCookie("accessToken")}`
        }
    });
}

// Обновить данные о пользователе
export async function setUserData(email: string, password: string, name: string): Promise<TSuccessfulProfile> {
    return await fetchWithRefresh<TSuccessfulProfile>(`${NORMA_API}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'authorization': `Bearer ${getCookie("accessToken")}`
        },
        body: JSON.stringify({ email, password, name })
    });
}

// Обновление токена авторизации
export async function refreshToken(): Promise<TSuccessfulTokenRefresh> {
    return fetch(`${NORMA_API}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    }).then((res) => checkReponse<TSuccessfulTokenRefresh>(res));
};

export async function fetchWithRefresh<T>(url: string, options: any): Promise<T> {
    try {
        const res = await fetch(url, options);
        return await checkReponse<T>(res);
    } catch (err: any) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();

            if (!refreshData.success) {
                Promise.reject(refreshData);
            }

            localStorage.setItem("refreshToken", refreshData.refreshToken);
            setCookie("accessToken", refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkReponse<T>(res);
        } else {
            return Promise.reject(err);
        }
    }
};

export function setCookie(name: string, value: string, props: any = {}): void {
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

function getCookie(name: string): (string | undefined) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}