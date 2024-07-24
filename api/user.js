import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import api from '@/api/main';
import defaultProfilePicture from '@/assets/images/default-profile-picture.png';

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

export const setProfilePicture = async () => {
    try {
        const response = await api.get(`/user/get-profile-picture/`, { responseType: 'arraybuffer' });
        console.log("Info:", response.headers['content-type']);
        if (response.status === 200) {

            const contentType = response.headers['content-type'];
            let extension = 'png'; // default extension
            if (contentType === 'image/jpeg' || contentType === 'image/jpg') {
                extension = 'jpg';
            } else if (contentType === 'image/png') {
                extension = 'png';
            }

            const base64Image = response.request._response;
            const profilePictureUri = `${FileSystem.documentDirectory}profile_picture.${extension}`;
            // TODO: Comment out to work in web browser, uncomment to work in mobile
            // await FileSystem.writeAsStringAsync(profilePictureUri, base64Image, { encoding: FileSystem.EncodingType.Base64 });
            // await AsyncStorage.setItem('profilePicture', JSON.stringify({ uri: profilePictureUri }));
            // console.log('Stored Profile Picture URI:', profilePictureUri);
            await AsyncStorage.setItem('profilePicture', JSON.stringify(defaultProfilePicture));
        } else {
            console.error("Profile Picture exists but error in processing the response.");
        }
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