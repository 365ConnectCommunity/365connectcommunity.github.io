import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

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
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Fetch extra data from Firestore 'users' collection
                let extraData = {};
                try {
                    const docRef = doc(db, 'users', firebaseUser.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        extraData = docSnap.data();
                    }
                } catch (e) {
                    console.error("Error fetching user profile:", e);
                }

                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    name: firebaseUser.displayName || `${extraData.firstname || ''} ${extraData.lastname || ''}`.trim() || firebaseUser.email,
                    image: firebaseUser.photoURL || extraData.entityimage || extraData.imageurl, // Handle various photo keys
                    ...extraData
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = (userData) => {
        // optimistically set user if needed, but the listener will handle it
        if (userData) setUser(prev => ({ ...prev, ...userData }));
    };

    const logout = async () => {
        try {
            await signOut(auth);
            // State clear handled by listener
        } catch (error) {
            console.error("Logout error", error);
        }
    };

    const updateUser = (userData) => {
        setUser(prev => ({ ...prev, ...userData }));
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
