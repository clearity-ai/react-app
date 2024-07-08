import { useContext, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { AuthContext } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user.id) {
                router.replace('(auth)');
            }
        }
    }, [user, loading]);

    if (loading) {
        return null; // or a loading spinner
    }

    return children;
};

export default ProtectedRoute;