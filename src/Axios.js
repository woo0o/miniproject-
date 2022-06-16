import axios from "axios";

export const api = axios.create({
    baseURL: "http://13.125.217.152/",

});



export const Axios = {
    login: (username, password) =>
        api.post('/api/login', {
            username: username,
            password: password,
        }),
    signup: (username, nickname, password) =>
        api.post('/api/signup', {
            username: username,
            nickname: nickname,
            password: password,
        }),
};

