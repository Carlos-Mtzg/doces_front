import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const AxiosMultipartClient = axios.create({
    baseURL: SERVER_URL,
});

const requestHamdler = (req) => {
    const session = JSON.parse(localStorage.getItem('token'));
    if (session?.token) req.headers['Authorization'] = `Bearer ${session.token}`;
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