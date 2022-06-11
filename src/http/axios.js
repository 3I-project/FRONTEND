import axios from 'axios';
import { useCookies } from "vue3-cookies"

const { cookies  } = useCookies();

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:5500/apiV1/' : 'http://134.0.115.249:5500/apiV1/'

const $api = axios.create({
    baseURL,
    withCredentials: true,
})

$api.interceptors.request.use(config => {
    config.headers.Authorization = localStorage.getItem('access');
    return config;
})

$api.interceptors.response.use(config => {
    return config
}, async (error) => {
    if (error.response.status === 401) {
        /*console.log('Access_token истек')
        const originalRequest = error.config;

        try {
            await axios.get('http://localhost:5500/apiV1/auth/refresh',{ withCredentials: true })
                .then(response => {
                    const { data } = response;
                    console.log(data)

                    if (data.status) {
                        console.log('токены успешно обновлены')

                        localStorage.setItem('access', data.tokens.access_token)
                        cookies.set('refresh', data.tokens.refresh_token);

                        return $api.request(originalRequest);
                    }
                })
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН', e);
            localStorage.removeItem('access');
        }*/
        localStorage.removeItem('access');
        cookies.remove('refresh');

        window.location.href = "/main";
    }
    return Promise.reject(error);
})


export default $api;
