
import axios from 'axios';

function getHeader() {
    let headers = {};
    const token = localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = 'Bearer ' + token;
    } else {
        delete headers['Authorization'];
    }
    return headers;
}

let https = axios.create({
    baseURL: 'https://app.askvietnamese.vn/api',
});

export default https;
