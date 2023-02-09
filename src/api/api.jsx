import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;
const access_token = localStorage.getItem('token');

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + access_token,
    },
});

export default instance;

