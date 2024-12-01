import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const APP_JSON = 'multipart/form-data';

const AxiosMultipartClient = axios.create({
    baseURL: SERVER_URL,
});

const requestHamdler = (req) => {
    req.headers['Content-Type'] = APP_JSON;
    const session = localStorage.getItem('token');
    
    if (session?.token) req.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return req;
};

AxiosMultipartClient.interceptors.request.use(
    (req) => requestHamdler(req),
    (error) => Promise.reject(error)
);
AxiosMultipartClient.interceptors.response.use(
    (res) => Promise.resolve(res.data),
    (err) => Promise.reject(err)
);

export default AxiosMultipartClient;