import React, { createContext, useState, useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signIn as apiSignIn, signOut as apiSignOut, setToken as apiSetToken, getUser as apiGetUser, setProfilePicture as apiSetProfilePicture, signUp as apiSignUp } from '@/api/user';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    // Optionally validate token and fetch user data
                    const getUserResponse = await apiGetUser();
                    const user_data = getUserResponse.data;
                    setUser({
                        id: user_data.id,
                        email: user_data.email,
                        username: user_data.username,
                        sex: user_data.sex,
                        birthdate: user_data.birthdate
                    });

                    pp = await AsyncStorage.getItem('profilePicture');
                    if (!pp) {
                        await apiSetProfilePicture();
                    }

                    console.log("Auth Provider is mounted, token is found and user set.")
                    navigation.navigate('(tabs)');
                } else {
                    console.log("Auth Provider is mounted but token is not found.")
                }
            } catch (error) {
                console.error('Error during loading user:', error);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    const signIn = async (email, password) => {
        // if no email or password do nothing
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        setLoading(true);
        const data = await apiSignIn(email, password);
        // if no data throw error
        if (!data) {
            setLoading(false);
            throw new Error('Email or password is incorrect');
        }
        await apiSetToken(data.access_token);


        const getUserResponse = await apiGetUser();
        const user_data = getUserResponse.data;
        console.log('User data:', user_data);
        if (!user_data.id) {
            setLoading(false);
            throw new Error('Error during get user request');
        }

        setUser({
            id: user_data.id,
            email: user_data.email,
            username: user_data.username,
            sex: user_data.sex,
            birthdate: user_data.birthdate
        });

        await apiSetProfilePicture();

        setLoading(false);
    };

    const signUp = async (email, password, username, birthdate, sex, profilePicture) => {
        setLoading(true);
        const date = new Date(birthdate);
        const formattedBirthdate = date.toISOString().split('T')[0];
        await apiSignUp(email, password, username, formattedBirthdate, sex, profilePicture);
        await signIn(email, password);
    };

    const signOut = async () => {
        setLoading(true);
        try {
            await apiSignOut();
            setUser();
        } catch (error) {
            console.error('Error during sign out:', error);
        } finally {
            setLoading(false);
        }
    };

    const contextValue = useMemo(() => ({
        user,
        signUp,
        signIn,
        signOut,
        loading,
    }), [user, loading]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
