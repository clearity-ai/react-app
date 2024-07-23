import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/api/main';

export const signUp = async (email, password, username, formattedBirthdate, sex, profilePicture) => {
    try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('username', username);
        formData.append('sex', sex);
        formData.append('birthdate', formattedBirthdate);
        if (profilePicture) {
            formData.append('profile_picture', {
                uri: profilePicture.uri,
                type: profilePicture.type,
                name: profilePicture.name,
            });
        }
        const response = await api.post('/user/signup/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Sign-Up Response Status:', response.status);
        return response.data;
    } catch (error) {
        console.error('Error during sign up request:', error.response ? error.response.data : error.message);
        throw error;
    }
};

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
    await AsyncStorage.removeItem('profilePicture');
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

const defaultProfilePicture = require('@/assets/images/default-profile-picture.png');
export const setProfilePicture = async () => {
    try {
        const response = await api.get(`/user/get-profile-picture/`);
        console.log('Profile Picture Response Status:', response.status);
        await AsyncStorage.setItem('profilePicture', response.data);
        console.log('Profile Picture:', response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log('Profile picture not found, setting default profile picture.');
            await AsyncStorage.setItem('profilePicture', JSON.stringify(defaultProfilePicture));
        } else {
            console.error('Error during get user profile picture request:', error);
            throw error; // Re-throw if it's not a 404 error
        }
    }
};