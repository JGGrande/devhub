import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const HttpClient = axios.create({
  baseURL,
  headers: {
    'content-type': 'application/json',
    accept: 'application/json',
  },
});

export default HttpClient;