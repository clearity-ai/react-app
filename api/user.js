import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/api/main';

export const signIn = async (email, password) => {
    try {
        console.log('Sending request to sign in with email:', email);
        const response = await api.post('/user/signin/', { email, password });
        console.log('Sign-In Response Status:', response.status);
        return response.data;
    } catch (error) {
        console.error('Error during sign in request:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const signOut = async () => {
    await AsyncStorage.removeItem('token');
};

export const setToken = async (token) => {
    await AsyncStorage.setItem('token', token);
};

export const getUser = async () => {
    try {
        const response = await api.get('/user/get/');
        return response.data;
    } catch (error) {
        console.error('Error during get user request:', error);
        throw error;
    }
}