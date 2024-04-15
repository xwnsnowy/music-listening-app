import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'API-Key': API_KEY
  },
});

export default instance;