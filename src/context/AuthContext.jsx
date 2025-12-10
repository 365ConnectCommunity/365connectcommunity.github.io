import { createContext, useContext, useState, useEffect } from 'react';
import { isAuthenticated, getCurrentUser, saveUserData, logout as authLogout } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in on mount
        if (isAuthenticated()) {
            setUser(getCurrentUser());
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        saveUserData(userData);
        setUser(getCurrentUser());
    };

    const logout = () => {
        authLogout();
        setUser(null);
    };

    const updateUser = (userData) => {
        saveUserData(userData);
        setUser(getCurrentUser());
    };

    const value = {
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,
        loading
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
