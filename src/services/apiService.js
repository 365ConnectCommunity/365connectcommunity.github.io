import {
    collection,
    getDocs,
    query,
    where,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
    orderBy,
    Timestamp,
    setDoc
} from 'firebase/firestore';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile as updateAuthProfile
} from 'firebase/auth';
import { db, auth, googleProvider } from './firebase';

/**
 * Authentication APIs
 */
export const authAPI = {
    // Login with Email/Password
    login: async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Check if user doc exists, if not create it (safe-guard for manually created auth users)
            try {
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);

                if (!userDoc.exists()) {
                    await setDoc(userDocRef, {
                        uid: user.uid,
                        email: user.email,
                        firstname: '',
                        lastname: '',
                        image: user.photoURL || '',
                        createdAt: new Date().toISOString(),
                        role: 'member'
                    });
                }
            } catch (err) {
                console.error("Error checking/creating user doc on login:", err);
                // Non-blocking error, still return user
            }

            return user;
        } catch (error) {
            throw error;
        }
    },

    // Login with Google
    loginWithGoogle: async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            // Check if user exists in 'users' collection, if not add them
            const userRef = doc(db, 'users', userCredential.user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                const { email, displayName, phoneNumber, photoURL } = userCredential.user;
                const [firstname, lastname] = (displayName || '').split(' ');

                await setDoc(userRef, {
                    uid: userCredential.user.uid,
                    email,
                    firstname: firstname || '',
                    lastname: lastname || '',
                    phone: phoneNumber || '',
                    entityimage: photoURL || '',
                    role: 'member',
                    createdAt: Timestamp.now(),
                    updatedAt: Timestamp.now()
                });
            }

            return userCredential.user;
        } catch (error) {
            console.error("Google Login Error:", error);
            throw error;
        }
    },

    // Signup - Register new user
    signup: async (firstname, lastname, email, password, phone = '') => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update Auth Profile
            await updateAuthProfile(user, {
                displayName: `${firstname} ${lastname}`
            });

            // Create User Document in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email,
                firstname,
                lastname,
                phone,
                role: 'member',
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
            });

            return { success: true, message: 'Registration successful', user };
        } catch (error) {
            throw error;
        }
    },

    // Sign Out
    logout: async () => {
        return await signOut(auth);
    },

    // Deprecated methods kept for temporary compatibility if needed, 
    // but should be phased out as flow is changing.
    sendVerificationCode: async (email) => {
        console.warn('Authentication is now handled via Firebase Auth. Email verification not strictly enforced for login.');
        return { success: true };
    },

    verifyCode: async (email, code) => {
        console.warn('Authentication is now handled via Firebase Auth.');
        return { success: true };
    }
};

/**
 * User Profile APIs
 */
export const userAPI = {
    // Get user registered events
    getMyEvents: async (email) => {
        try {
            // Mapping registrations by email
            const q = query(collection(db, 'registrations'), where('email', '==', email));
            const querySnapshot = await getDocs(q);

            const registrations = querySnapshot.docs.map(doc => doc.data());

            // Fetch validation or details if needed. 
            // Attempting to join with events collection manually since NoSQL
            const myEvents = [];
            for (const Reg of registrations) {
                if (Reg.eventid) {
                    const eventRef = doc(db, 'events', Reg.eventid);
                    const eventSnap = await getDoc(eventRef);
                    if (eventSnap.exists()) {
                        const eventData = eventSnap.data();
                        myEvents.push({
                            eventid: Reg.eventid,
                            name: eventData.name,
                            createdon: Reg.registrationDate ? Reg.registrationDate.toDate().toISOString() : new Date().toISOString(),
                            attendee: Reg.name,
                            status: Reg.status || 'Confirmed',
                            statuscode: 1 // Active
                        });
                    }
                }
            }
            return myEvents;
        } catch (error) {
            console.error("Error fetching my events:", error);
            return [];
        }
    },

    // Update profile
    updateProfile: async (userId, profileData) => {
        try {
            const userRef = doc(db, 'users', userId);
            await updateDoc(userRef, {
                ...profileData,
                updatedAt: Timestamp.now()
            });
            return { success: true };
        } catch (error) {
            console.error("Update profile error:", error);
            throw error;
        }
    },

    // Delete account
    deleteAccount: async (userId) => {
        try {
            // Delete from Firestore
            await deleteDoc(doc(db, 'users', userId));
            // Deleting from Auth is handled by client needing re-auth typically, 
            // but we can try: 
            const user = auth.currentUser;
            if (user && user.uid === userId) {
                await user.delete();
            }
            return { success: true };
        } catch (error) {
            console.error("Delete account error:", error);
            throw error;
        }
    }
};

/**
 * Events APIs
 */
export const eventsAPI = {
    getEvents: async (type = 'UpComing') => {
        try {
            const eventsRef = collection(db, 'events');
            const now = Timestamp.now();
            let q;

            if (type === 'UpComing') {
                q = query(eventsRef, where('startdate', '>=', now), orderBy('startdate', 'asc'));
            } else {
                q = query(eventsRef, where('startdate', '<', now), orderBy('startdate', 'desc'));
            }

            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    eventid: doc.id,
                    name: data.name,
                    description: data.description,
                    startdate: data.startdate ? data.startdate.toDate().toISOString() : null,
                    enddate: data.enddate ? data.enddate.toDate().toISOString() : null,
                    duration: data.duration,
                    location: data.location || '',
                    eventimage: data.eventimage,
                    registrationopen: data.registrationopen,
                    statuscode: data.statuscode,
                    host: data.host || '',
                    eventtype: data.eventtype || ''
                };
            });
        } catch (error) {
            console.error("Error fetching events:", error);
            // Return empty if needed or throw
            return [];
        }
    },

    getEventDetails: async (eventId) => {
        try {
            const docRef = doc(db, 'events', eventId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                return {
                    eventid: docSnap.id,
                    ...data,
                    startdate: data.startdate ? data.startdate.toDate().toISOString() : null,
                    enddate: data.enddate ? data.enddate.toDate().toISOString() : null
                };
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error fetching event details:", error);
            throw error;
        }
    },

    registerForEvent: async (eventId, email, name) => {
        try {
            // Check if already registered
            const q = query(
                collection(db, 'registrations'),
                where('eventid', '==', eventId),
                where('email', '==', email)
            );
            const existing = await getDocs(q);
            if (!existing.empty) {
                return { success: true, message: 'Already registered' };
            }

            await addDoc(collection(db, 'registrations'), {
                eventid: eventId,
                email: email,
                name: name,
                uid: auth.currentUser ? auth.currentUser.uid : null, // Add UID for new schema
                registrationDate: Timestamp.now(),
                status: 'Confirmed'
            });

            return { success: true, message: 'Registration successful' };
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    },

    checkRegistration: async (eventId, email) => {
        try {
            const q = query(
                collection(db, 'registrations'),
                where('eventid', '==', eventId),
                where('email', '==', email)
            );
            const existing = await getDocs(q);
            return !existing.empty;
        } catch (error) {
            console.error("Error checking registration:", error);
            return false;
        }
    }
};

/**
 * Course Progress APIs
 */
export const courseAPI = {
    // Save or update course progress
    saveProgress: async (userId, courseId, completedLessons) => {
        try {
            const progressId = `${userId}_${courseId}`;
            const progressRef = doc(db, 'course_progress', progressId);

            await setDoc(progressRef, {
                uid: userId,
                courseId: courseId,
                completedLessons: completedLessons,
                lastUpdated: Timestamp.now()
            }, { merge: true });

            return { success: true };
        } catch (error) {
            console.error("Error saving course progress:", error);
            throw error;
        }
    },

    // Get course progress
    getProgress: async (userId, courseId) => {
        try {
            const progressId = `${userId}_${courseId}`;
            const progressRef = doc(db, 'course_progress', progressId);
            const docSnap = await getDoc(progressRef);

            if (docSnap.exists()) {
                return docSnap.data().completedLessons || [];
            } else {
                return [];
            }
        } catch (error) {
            console.error("Error fetching course progress:", error);
            return [];
        }
    },

    // Get all progress for a user (for My Courses page)
    getAllUserProgress: async (userId) => {
        try {
            const q = query(collection(db, 'course_progress'), where('uid', '==', userId));
            const querySnapshot = await getDocs(q);
            const progressMap = {};
            querySnapshot.forEach(doc => {
                const data = doc.data();
                progressMap[data.courseId] = data.completedLessons || [];
            });
            return progressMap;
        } catch (error) {
            console.error("Error fetching all user progress:", error);
            return {};
        }
    },

    // Enroll user in a course
    enrollUser: async (userId, courseId) => {
        try {
            const enrollId = `${userId}_${courseId}`;
            const enrollRef = doc(db, 'course_enrollments', enrollId);
            await setDoc(enrollRef, {
                uid: userId,
                courseId: courseId,
                enrolledAt: Timestamp.now()
            });
            return { success: true };
        } catch (error) {
            console.error("Error enrolling user:", error);
            throw error;
        }
    },

    // Get user enrollments
    getUserEnrollments: async (userId) => {
        try {
            const q = query(collection(db, 'course_enrollments'), where('uid', '==', userId));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => doc.data().courseId);
        } catch (error) {
            console.error("Error fetching enrollments:", error);
            return [];
        }
    }
};

/**
 * Certificates API
 */
export const certificatesAPI = {
    getCertificates: async (email) => {
        try {
            const q = query(collection(db, 'certificates'), where('email', '==', email)); // Assuming email is stored in certs or we use UID
            // Fallback: the schema calls for 'uid', but legacy API used email. 
            // If we have UID available in usage, switch to UID. 
            // For now query by email if that's what is passed.

            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    certificateid: doc.id,
                    ...data,
                    issueddate: data.issueddate ? data.issueddate.toDate().toISOString() : null,
                    eventdate: data.eventdate ? data.eventdate.toDate().toISOString() : null
                };
            });
        } catch (error) {
            console.error("Error fetching certificates:", error);
            return [];
        }
    },

    // Check if certificate exists for a user and course/event
    checkCertificate: async (email, eventName) => {
        try {
            const q = query(
                collection(db, 'certificates'),
                where('email', '==', email),
                where('eventname', '==', eventName)
            );
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                return { exists: true, certificateId: querySnapshot.docs[0].id };
            }
            return { exists: false };
        } catch (error) {
            console.error("Error checking certificate:", error);
            return { exists: false };
        }
    },

    // Issue a new certificate
    issueCertificate: async (certData) => {
        try {
            // certData should include: name, description, eventname, recipientname, email, uid
            const docRef = await addDoc(collection(db, 'certificates'), {
                ...certData,
                issueddate: Timestamp.now(),
                certificatetype: 'Course Completion', // Default type
                verificationlink: window.location.origin + '/certificate/' // Partial link, will append ID in UI
            });
            return { success: true, certificateId: docRef.id };
        } catch (error) {
            console.error("Error issuing certificate:", error);
            throw error;
        }
    }
};

/**
 * Team & Community APIs
 */
export const communityAPI = {
    getTeamMembers: async () => {
        try {
            const q = query(collection(db, 'team_members'), orderBy('order', 'asc')); // Assuming 'order' field exists
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    contactid: doc.id,
                    fullname: `${data.firstname || ''} ${data.lastname || ''}`.trim(),
                    firstname: data.firstname,
                    lastname: data.lastname,
                    jobtitle: data.designation,
                    emailaddress1: data.email,
                    entityimage: data.imageurl,
                    designation: data.designation,
                    facebook: data.facebook,
                    linkedin: data.linkedin,
                    instagram: data.instagram
                };
            });
        } catch (error) {
            console.error("Error fetching team:", error);
            return [];
        }
    },

    getCommunityMembers: async () => {
        // Placeholder: logic to get public profiles
        try {
            const q = query(collection(db, 'users'), where('role', '==', 'member'));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => doc.data());
        } catch (e) {
            return [];
        }
    }
};

/**
 * Support & Contact APIs
 */
export const supportAPI = {
    submitSupport: async (name, email, message) => {
        try {
            await addDoc(collection(db, 'support_messages'), {
                name,
                email,
                message,
                createdAt: Timestamp.now(),
                status: 'New'
            });
            return { success: true };
        } catch (error) {
            console.error("Support submission error:", error);
            throw error;
        }
    },

    getSocials: async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'socials'));
            return querySnapshot.docs.map(doc => doc.data());
        } catch (error) {
            console.error("Error fetching socials:", error);
            return [];
        }
    }
};

export default {
    authAPI,
    userAPI,
    eventsAPI,
    courseAPI,
    certificatesAPI,
    communityAPI,
    supportAPI
};
