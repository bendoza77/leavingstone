const GetLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(value));
}

const SetLocalStorage = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value));
}

export { GetLocalStorage, SetLocalStorage }