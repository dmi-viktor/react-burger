const NORMA_API = 'https://norma.nomoreparties.space/api';

export async function getIngredients() {
    return await fetch(`${NORMA_API}/ingredients`)
        .then(checkReponse);
};

function checkReponse(response) {
    return response.ok ? response.json() : response.json().then((err) => Promise.reject(err));
};

export async function createOrder(data) {
    return await fetch(`${NORMA_API}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ingredients: data })
    }).then(checkReponse);
}