import axios from 'axios';

const $api = axios.create({
    baseURL: 'http://localhost:5500/apiV1/',
    withCredentials: false,
    timeout: 1000,
})

$api.interceptors.response.use(config => {
    return config
}, (error) => {
    return Promise.reject(error);
})


export default $api;
