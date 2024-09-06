import React, { createContext, useState, useEffect } from 'react';

// Hooks
import { useAuth } from '@/hooks/useAuth';

// Constants
import { initialCheckinData } from '@/constants/Values';

export const CheckinContext = createContext();

export const CheckinProvider = ({ children }) => {
    const { user } = useAuth();
    const [checkinData, setCheckinData] = useState({
        ...initialCheckinData,
        userId: user?.id || null,
    });

    // Reinitialize checkinData when user changes
    useEffect(() => {
        if (user) {
            setCheckinData({
                ...initialCheckinData,
                userId: user.id,
            });
        } else {
            // Reset checkinData if user logs out
            setCheckinData({
                ...initialCheckinData,
                userId: null,
            });
        }
    }, [user]);

    const updatePhotoURI = (areaId, photoURI) => {
        const updatedCheckinData = { ...checkinData };
        updatedCheckinData.checkinAreas[areaId].photoURI = photoURI;
        setCheckinData(updatedCheckinData);
    };

    const updateUserRating = (areaId, rating) => {
        const updatedCheckinData = { ...checkinData };
        updatedCheckinData.checkinAreas[areaId].userRating = rating;
        setCheckinData(updatedCheckinData);
    };

    const updateCheckinDate = () => {
        const date = new Date();
        console.log('updated checkin date', date);
        const updatedCheckinData = { ...checkinData };
        updatedCheckinData.checkinDate = date;
        setCheckinData(updatedCheckinData);
    }

    const updateCheckinRoutineId = (routineId) => {
        const updatedCheckinData = { ...checkinData };
        updatedCheckinData.routineId = routineId;
        setCheckinData(updatedCheckinData);
    };

    const pushCheckinData = () => {
        // Save current checkinData to database
        console.log('pushing checkin data to database', checkinData);
        // Reset checkinData
        setCheckinData({
            ...initialCheckinData,
            userId: user.id,
        });
    };

    return (
        <CheckinContext.Provider value={{ checkinData, updatePhotoURI, updateUserRating, updateCheckinDate, pushCheckinData }}>
            {children}
        </CheckinContext.Provider>
    );
};
