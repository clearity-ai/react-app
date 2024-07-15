import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const API_BASE_URL = 'http://localhost:8000';
// const API_BASE_URL = 'https://api-dipjwhqypa-ez.a.run.app';

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

