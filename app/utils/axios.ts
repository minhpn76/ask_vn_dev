import axios from 'axios';

export function getHeader() {
  let headers = {};
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  } else {
    delete headers['Authorization'];
  }
  return headers;
}

let AXIOS_CLIENT = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

export default AXIOS_CLIENT;
