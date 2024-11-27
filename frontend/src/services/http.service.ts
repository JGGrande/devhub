import axios from "axios";

const HttpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
    accept: 'application/json',
  },
});

export default HttpClient;