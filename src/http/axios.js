import axios from 'axios';

const $api = axios.create({
    baseURL: 'http://localhost:5500/apiV1/',
    withCredentials: false,
    timeout: 10000,
})

$api.interceptors.response.use(config => {
    return config
}, (error) => {

    if (error.response.status === 401) {
        console.log('Access_token истек')
    }

    return Promise.reject(error);
})


export default $api;
