import React, { createContext, useState, useEffect } from 'react';

// Hooks
import { useAuth } from '@/hooks/useAuth';

// Constants
import { emptyRoutine, initialRoutinesArray } from '@/constants/Values';

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
    const updateRoutineName = (routineIndex, name) => {
        const newRoutines = [...routinesData.routines];
        newRoutines[routineIndex].routineName = name;
        setRoutinesData({
            ...routinesData,
            routines: newRoutines,
        });
    };

    // Update routine step depending on itemType or itemBrand supplied
    const updateRoutineStep = (routineIndex, timing, stepIndex, itemType, itemBrand) => {
        console.log(routineIndex, timing, stepIndex, itemType, itemBrand);
        const newRoutines = [...routinesData.routines];
        if (itemType !== undefined) newRoutines[routineIndex].routineSteps[timing][stepIndex].itemType = itemType;
        if (itemBrand !== undefined) newRoutines[routineIndex].routineSteps[timing][stepIndex].itemBrand = itemBrand;
        setRoutinesData({
            ...routinesData,
            routines: newRoutines,
        });
    };

    // Add or remove last step of a routine
    const updateRoutineSteps = (routineIndex, timing, action) => {
        const newRoutines = [...routinesData.routines];
        if (action === 'add') {
            const newOrder = newRoutines[routineIndex].routineSteps[timing].length + 1;
            newRoutines[routineIndex].routineSteps[timing].push({
                order: newOrder,
                itemType: '',
                itemBrand: '',
            });
        } else if (action === 'remove') {
            newRoutines[routineIndex].routineSteps[timing].pop();
        }
        setRoutinesData({
            ...routinesData,
            routines: newRoutines,
        });
    };

    const addNewRoutine = () => {
        // Add new routine to routinesData
        const newRoutines = [...routinesData.routines];
        newRoutines.push(emptyRoutine);
        setRoutinesData({
            ...routinesData,
            routines: newRoutines,
        });
    }

    const saveRoutineChanges = () => {
        // TODO: Update database with new routinesData when user saves changes (right checkmark exce[pt for deleted routines])
        console.log("Saving routine changes to database");
    };

    const undoRoutineChanges = () => {
        // TODO: Fetch user's routines from database and update routinesData when user cancels changes (left cross)
        console.log("Undoing routine changes by (re)fetching from database");
    };

    const deleteRoutine = (routineIndex) => {
        const newRoutines = [...routinesData.routines];
        newRoutines.splice(routineIndex, 1);
        setRoutinesData({
            ...routinesData,
            routines: newRoutines,
        });
        // TODO: Update database to set routine entry's "deleted" field to true
    }

    return (
        <RoutinesContext.Provider value={{
            routinesData,
            updateRoutineStep,
            updateRoutineName,
            updateRoutineSteps,
            addNewRoutine,
            deleteRoutine,
            undoRoutineChanges,
            saveRoutineChanges,
        }}>
            {children}
        </RoutinesContext.Provider>
    );
};
