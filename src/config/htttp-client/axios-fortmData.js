import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const APP_JSON = 'application/json';

const AxiosClientFormData = axios.create({
    baseURL: SERVER_URL,
});

const requestHandler = (req) => {
    req.headers['Accept'] = APP_JSON;
    if (!(req.data instanceof FormData)) {
        req.headers['Content-Type'] = APP_JSON;
    }
    const session = JSON.parse(localStorage.getItem('user'));
    if (session?.token) req.headers['Authorization'] = `Bearer ${session.token}`;
    return req;
};
 
AxiosClientFormData.interceptors.request.use(
    (req) => requestHandler(req),
    (error) => Promise.reject(error)
);

AxiosClientFormData.interceptors.response.use(
    (res) => Promise.resolve(res.data),
    (err) => Promise.reject(err)
);

export default AxiosClientFormData;