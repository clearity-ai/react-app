import React, { createContext, useState, useEffect } from 'react';

// Hooks
import { useAuth } from '@/hooks/useAuth';

// Constants
import { emptyRoutine, initialRoutinesArray, placeholderId } from '@/constants/Values';

export const RoutinesContext = createContext();

export const RoutinesProvider = ({ children }) => {
    const { user } = useAuth();
    const [routinesData, setRoutinesData] = useState({
        routines: initialRoutinesArray,
        userId: user?.id || null,
    });

    // Reinitialize routinesData when user changes
    useEffect(() => {
        if (user) {
            // TODO: Fetch user's routines from database and update routinesData
            // If not, set routinesData to initialRoutinesArray
            setRoutinesData({
                routines: initialRoutinesArray,
                userId: user.id,
            });
        } else {
            // Reset checkinData if user logs out
            setRoutinesData({
                routines: initialRoutinesArray,
                userId: null,
            });
        }
    }, [user]);

    // Update routine name
    const updateRoutineName = (routineId, name) => {
        const newRoutines = { ...routinesData.routines };
        newRoutines[routineId].routineName = name;
        newRoutines[routineId].requiresDBupdate = true;
        setRoutinesData({
            ...routinesData,
            routines: newRoutines,
        });
    };

    // Update routine step depending on itemType or itemBrand supplied
    const updateRoutineStep = (routineId, timing, stepIndex, itemType, itemBrand) => {
        console.log(routineId, timing, stepIndex, itemType, itemBrand);
        const newRoutines = { ...routinesData.routines };
        if (itemType !== undefined) newRoutines[routineId].routineSteps[timing][stepIndex].itemType = itemType;
        if (itemBrand !== undefined) newRoutines[routineId].routineSteps[timing][stepIndex].itemBrand = itemBrand;
        newRoutines[routineId].requiresDBupdate = true;
        setRoutinesData({
            ...routinesData,
            routines: newRoutines,
        });
    };

    // Add or remove last step of a routine
    const updateRoutineSteps = (routineId, timing, action) => {
        const newRoutines = { ...routinesData.routines };
        if (action === 'add') {
            const newOrder = newRoutines[routineId].routineSteps[timing].length + 1;
            newRoutines[routineId].routineSteps[timing].push({
                order: newOrder,
                itemType: '',
                itemBrand: '',
            });
        } else if (action === 'remove') {
            newRoutines[routineId].routineSteps[timing].pop();
        }
        newRoutines[routineId].requiresDBupdate = true;
        setRoutinesData({
            ...routinesData,
            routines: newRoutines,
        });
    };

    const addNewRoutine = (placeholderId) => {
        // Add new routine to routinesData
        const newRoutines = { ...routinesData.routines };
        newRoutines[placeholderId] = emptyRoutine;
        setRoutinesData({
            ...routinesData,
            routines: newRoutines,
        });
    };

    const deleteRoutine = (routineId) => {
        const newRoutines = { ...routinesData.routines };
        if (routineId == placeholderId) {
            delete newRoutines[placeholderId];
        } else {
            newRoutines[routineId].deleted = true;
            newRoutines[routineId].requiresDBupdate = true;
        };
        setRoutinesData({
            ...routinesData,
            routines: newRoutines,
        });
        console.log("Current routinesData:", routinesData);
        updateRoutinesDB();
    };

    const updateRoutinesDB = () => {
        // TODO: save current routinesData to database
        console.log('pushing routines data to database', routinesData);
        // TODO: Fetch user's routines from database and update routinesData (gets routines with new IDs)
    };

    const fetchRoutinesDB = () => {
        // TODO: undo changes to routinesData by re-fetching from database
        console.log('fetching routines data from database', routinesData);
    };

    return (
        <RoutinesContext.Provider value={{
            routinesData,
            updateRoutineStep,
            updateRoutineName,
            updateRoutineSteps,
            addNewRoutine,
            deleteRoutine,
            updateRoutinesDB,
            fetchRoutinesDB,
        }}>
            {children}
        </RoutinesContext.Provider>
    );
};
