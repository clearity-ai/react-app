import { useContext } from 'react';
import { RoutinesContext } from '@/contexts/RoutinesContext';

export const useRoutines = () => {
    return useContext(RoutinesContext);
};