/**
 * Authentication Service - Handles user authentication and localStorage management
 * Maintains compatibility with legacy localStorage structure
 */

const STORAGE_KEYS = {
    EMAIL: 'email',
    NAME: 'name',
    FIRSTNAME: 'firstname',
    LASTNAME: 'lastname',
    IMAGE: 'image',
    // Temporary storage for verification flow
    EMAIL_TEMP: 'email1',
    NAME_TEMP: 'name1',
    FIRSTNAME_TEMP: 'firstname1',
    LASTNAME_TEMP: 'lastname1',
    IMAGE_TEMP: 'image1'
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
    const email = localStorage.getItem(STORAGE_KEYS.EMAIL);
    const name = localStorage.getItem(STORAGE_KEYS.NAME);

    return email &&
        name &&
        email !== 'null' &&
        name !== 'null' &&
        email !== '' &&
        name !== '' &&
        email !== 'undefined' &&
        name !== 'undefined';
};

/**
 * Get current user data
 */
export const getCurrentUser = () => {
    if (!isAuthenticated()) {
        return null;
    }

    return {
        email: localStorage.getItem(STORAGE_KEYS.EMAIL),
        name: localStorage.getItem(STORAGE_KEYS.NAME),
        firstname: localStorage.getItem(STORAGE_KEYS.FIRSTNAME),
        lastname: localStorage.getItem(STORAGE_KEYS.LASTNAME),
        image: localStorage.getItem(STORAGE_KEYS.IMAGE)
    };
};

/**
 * Save user data to localStorage (after successful login)
 */
export const saveUserData = (userData) => {
    localStorage.setItem(STORAGE_KEYS.EMAIL, userData.email || userData.emailaddress1 || '');
    localStorage.setItem(STORAGE_KEYS.NAME, userData.name || userData.fullname || '');
    localStorage.setItem(STORAGE_KEYS.FIRSTNAME, userData.firstname || '');
    localStorage.setItem(STORAGE_KEYS.LASTNAME, userData.lastname || '');
    localStorage.setItem(STORAGE_KEYS.IMAGE, userData.image || userData.entityimage || '');
};

/**
 * Save temporary user data (during verification flow)
 */
export const saveTempUserData = (userData) => {
    localStorage.setItem(STORAGE_KEYS.EMAIL_TEMP, userData.email || userData.emailaddress1 || '');
    localStorage.setItem(STORAGE_KEYS.NAME_TEMP, userData.name || userData.fullname || '');
    localStorage.setItem(STORAGE_KEYS.FIRSTNAME_TEMP, userData.firstname || '');
    localStorage.setItem(STORAGE_KEYS.LASTNAME_TEMP, userData.lastname || '');
    localStorage.setItem(STORAGE_KEYS.IMAGE_TEMP, userData.image || userData.entityimage || '');
};

/**
 * Get temporary user data
 */
export const getTempUserData = () => {
    return {
        email: localStorage.getItem(STORAGE_KEYS.EMAIL_TEMP),
        name: localStorage.getItem(STORAGE_KEYS.NAME_TEMP),
        firstname: localStorage.getItem(STORAGE_KEYS.FIRSTNAME_TEMP),
        lastname: localStorage.getItem(STORAGE_KEYS.LASTNAME_TEMP),
        image: localStorage.getItem(STORAGE_KEYS.IMAGE_TEMP)
    };
};

/**
 * Promote temporary user data to permanent (after verification)
 */
export const promoteTempUserData = () => {
    const tempData = getTempUserData();
    saveUserData(tempData);
    clearTempUserData();
};

/**
 * Clear temporary user data
 */
export const clearTempUserData = () => {
    localStorage.removeItem(STORAGE_KEYS.EMAIL_TEMP);
    localStorage.removeItem(STORAGE_KEYS.NAME_TEMP);
    localStorage.removeItem(STORAGE_KEYS.FIRSTNAME_TEMP);
    localStorage.removeItem(STORAGE_KEYS.LASTNAME_TEMP);
    localStorage.removeItem(STORAGE_KEYS.IMAGE_TEMP);
};

/**
 * Logout user
 */
export const logout = () => {
    localStorage.setItem(STORAGE_KEYS.EMAIL, 'null');
    localStorage.setItem(STORAGE_KEYS.NAME, 'null');
    localStorage.setItem(STORAGE_KEYS.IMAGE, 'null');
    localStorage.removeItem(STORAGE_KEYS.FIRSTNAME);
    localStorage.removeItem(STORAGE_KEYS.LASTNAME);
    clearTempUserData();
};

/**
 * Get user profile image URL
 */
export const getUserImage = () => {
    const image = localStorage.getItem(STORAGE_KEYS.IMAGE);

    if (!image || image === '' || image === 'null' || image === 'undefined') {
        return '/assets/images/icons8-account-64.png'; // Default image
    }

    // If it's already a full URL, return it
    if (image.startsWith('http')) {
        return image;
    }

    // Otherwise, it's base64
    return `data:image/png;base64,${image}`;
};

export default {
    isAuthenticated,
    getCurrentUser,
    saveUserData,
    saveTempUserData,
    getTempUserData,
    promoteTempUserData,
    clearTempUserData,
    logout,
    getUserImage
};
