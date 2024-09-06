import { useContext } from 'react';
import { CheckinContext } from '@/contexts/CheckinContext';

export const useCheckin = () => {
    return useContext(CheckinContext);
};