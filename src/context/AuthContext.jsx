import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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
                    } else {
                        // Check for legacy migration by email
                        const safeEmailId = firebaseUser.email.toLowerCase().replace(/[^a-z0-9@._-]/g, '_');
                        const legacyDocRef = doc(db, 'users', safeEmailId);
                        const legacySnap = await getDoc(legacyDocRef);

                        if (legacySnap.exists()) {
                            // User was migrated! Link legacy data to this new UID.
                            extraData = legacySnap.data();
                            console.log("Found legacy profile, linking to UID...", extraData);

                            // Save to UID doc
                            await setDoc(docRef, { ...extraData, uid: firebaseUser.uid }, { merge: true });

                            // Optional: Delete legacy doc or keep as alias? 
                            // Keeping it might be safer for now, or delete to prevent confusion.
                            // Let's keep it but maybe mark it? existing logic in migration uses it.
                        }
                    }
                } catch (e) {
                    console.error("Error fetching user profile:", e);
                }

                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    name: firebaseUser.displayName || `${extraData.firstname || ''} ${extraData.lastname || ''}`.trim() || firebaseUser.email,
                    role: extraData.role || 'member',
                    // Handle image: PhotoURL (Google) -> imageurl (Migrated) -> entityimage (Legacy)
                    image: firebaseUser.photoURL || extraData.imageurl || extraData.entityimage || extraData.image,
                    firstname: extraData.firstname,
                    lastname: extraData.lastname,
                    phone: extraData.phone,
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
        isAdmin: (user?.email?.toLowerCase() === 'mianshaheerahmed@gmail.com' || user?.role === 'admin'),
        login,
        logout,
        updateUser,
        loading
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
