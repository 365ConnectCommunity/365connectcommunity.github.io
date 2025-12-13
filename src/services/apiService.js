/**
 * API Service - Centralized API calls for 365Connect Community
 * All Azure Logic Apps endpoints are configured here
 */

const API_ENDPOINTS = {
    // Authentication & User Management
    LOGIN: 'https://prod-43.westeurope.logic.azure.com:443/workflows/6925f68ce8a842d8893aa7a606a6c8f4/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=-rUEpqm-E6NB2lrmxYrhX-CEj6IKu_-asLVQ_Qkcv4I',
    SIGNUP: 'https://prod-81.westeurope.logic.azure.com:443/workflows/a8d5d8b3b2814ba49b821f72867f9fd9/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=8_KyqUMf_INSyP35K0GBnSGrghCdXcubKW4h6HsGBvI',
    SEND_VERIFICATION: 'https://prod-127.westeurope.logic.azure.com:443/workflows/3fa135848c174b6ab5c96e435848c539/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=EiYXqTRJmErp41dJRg7PbOlf-UKGHe7n-PhmilTM6_w',
    VERIFY_CODE: 'https://prod-209.westeurope.logic.azure.com:443/workflows/c0bb2d10ed58415695b94bce060ac427/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=XfmNae_9UnsIvRwiXHv9vzk7h0L44wP1V3wa9gRcyPg',
    GET_PROFILE: 'https://prod-220.westeurope.logic.azure.com:443/workflows/66e34ad255f1445d9efae36cc77c1825/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=13kRhYkPXo5PI3kaeD9fXVgZhMqWIJwPF84o3FUMNnY',
    UPDATE_PROFILE: 'https://prod-158.westeurope.logic.azure.com:443/workflows/b34d7018c77343d5be0987e9b18c7beb/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=urhseaxJ-BK6cO_N2657WEjEXnXn5y9862IiGrkA05A',
    DELETE_ACCOUNT: 'https://prod-191.westeurope.logic.azure.com:443/workflows/c2394956d13d4608be0fa6bc87404282/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Egsd_HYbC_jOldOC9vX6jaAku_1Ko5ljeAe7h5Fgk7c',

    // Events
    GET_EVENTS: 'https://prod-219.westeurope.logic.azure.com:443/workflows/08239d2cedcf41fc9fc197aacd628218/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=0mXHdglVvx_N1yD8YvLMm5vGq67z3X8vny11Y3UbL7U',
    GET_EVENT_DETAILS: 'https://prod-139.westeurope.logic.azure.com:443/workflows/9c9e4efc9a5549b18d35f849eca29e67/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=sOOm-RsST2gGm4qNFOXmganrmS27F2BxzXzKtjStyyQ',
    REGISTER_EVENT: 'https://prod-83.westeurope.logic.azure.com:443/workflows/d92dc5c271c540f8aa522dcd42d25037/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=pkFf5ipzCW2UTr7dWvyHhZ11uDg4of8tvIfgcS303Js',

    // Certificates
    GET_CERTIFICATES: 'https://prod-211.westeurope.logic.azure.com:443/workflows/50594cb1227741739216cf63fcdec0af/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=UO7we7Jqp5hQiuTNZdjzZHTW3ULsb_WTL3yZCf6wp6k',

    // Team & Community
    GET_TEAM_MEMBERS: 'https://prod-72.westeurope.logic.azure.com:443/workflows/957b2e51c16540ff8c63857a67a6a0e6/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=VZ_w69-oK1l9eSjf83FxPTXDpqr-GnposYU1D15354g',
    GET_COMMUNITY_MEMBERS: 'https://prod-107.westeurope.logic.azure.com:443/workflows/911c8454b01946eb88b33cc200e0cc33/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=lVzW4lLPwwAwwok5lGZ7WzaEBM2UW6r_-40cUwE86vQ',

    // Support & Contact
    CONTACT_SUPPORT: 'https://prod-136.westeurope.logic.azure.com:443/workflows/7ee4de0f92d442fd8547108b007ad08a/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ucJm0SiRYORTLODpK8UCbIP7UorZjtBu3UeQVQsaPGI',
    GET_SOCIALS: 'https://prod-28.westeurope.logic.azure.com:443/workflows/e28efca878834c46a6645e91cf3b0d2b/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Ju80x0se3WdkwWEDVhAHG8vqTQkr41IchGxcbdnrW94'
};

/**
 * Generic API call handler
 */
const apiCall = async (url, options = {}) => {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        // Check if response has content
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }

        return response;
    } catch (error) {
        console.error('API Call Error:', error);
        throw error;
    }
};

/**
 * Authentication APIs
 */
export const authAPI = {
    // Login - Check if email exists
    login: async (email) => {
        const headers = new Headers();
        headers.append('email', email);

        const response = await fetch(API_ENDPOINTS.LOGIN, {
            method: 'GET',
            headers,
            redirect: 'follow'
        });

        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error('Account not found');
        }
    },

    // Signup - Register new user
    signup: async (firstname, lastname, email, phone = '') => {
        const headers = new Headers();
        headers.append('email', email);
        headers.append('phone', phone);
        headers.append('firstname', firstname);
        headers.append('lastname', lastname);

        const response = await fetch(API_ENDPOINTS.SIGNUP, {
            method: 'POST',
            headers,
            redirect: 'follow'
        });

        if (response.status === 200) {
            return { success: true, message: 'Registration successful' };
        } else {
            throw new Error('Registration failed. Email may already be registered.');
        }
    },

    // Send verification code
    sendVerificationCode: async (email) => {
        const headers = new Headers();
        headers.append('email', email);

        return await apiCall(API_ENDPOINTS.SEND_VERIFICATION, {
            method: 'POST',
            headers,
            redirect: 'follow'
        });
    },

    // Verify code
    verifyCode: async (email, code) => {
        const headers = new Headers();
        headers.append('email', email);
        headers.append('code', code);

        return await apiCall(API_ENDPOINTS.VERIFY_CODE, {
            method: 'POST',
            headers,
            redirect: 'follow'
        });
    }
};

/**
 * User Profile APIs
 */
export const userAPI = {
    // Get user profile
    getProfile: async (email) => {
        const headers = new Headers();
        headers.append('email', email);

        return await apiCall(API_ENDPOINTS.GET_PROFILE, {
            method: 'GET',
            headers,
            redirect: 'follow'
        });
    },

    // Update profile
    updateProfile: async (profileData) => {
        const headers = new Headers();
        Object.keys(profileData).forEach(key => {
            headers.append(key, profileData[key]);
        });

        return await apiCall(API_ENDPOINTS.UPDATE_PROFILE, {
            method: 'POST',
            headers,
            redirect: 'follow'
        });
    },

    // Delete account
    deleteAccount: async (email) => {
        const headers = new Headers();
        headers.append('email', email);

        return await apiCall(API_ENDPOINTS.DELETE_ACCOUNT, {
            method: 'DELETE',
            headers,
            redirect: 'follow'
        });
    }
};

/**
 * Events APIs
 */
export const eventsAPI = {
    // Get events (type: "UpComing" or "Past")
    getEvents: async (type = 'UpComing') => {
        const headers = new Headers();
        headers.append('type', type);

        const response = await fetch(API_ENDPOINTS.GET_EVENTS, {
            method: 'GET',
            headers,
            redirect: 'follow'
        });

        if (response.status === 200) {
            const data = await response.json();
            // Transform property names to match React component expectations
            return data.map(event => ({
                eventid: event.sa_eventid,
                name: event.sa_name,
                description: event.sa_description,
                startdate: event.sa_start,
                enddate: event.sa_end,
                duration: event.sa_duration,
                location: event.sa_location || '',
                eventimage: event.sa_eventimage,
                registrationopen: event.sa_registrationopen,
                statuscode: event.statuscode,
                host: event["_sa_host_value@OData.Community.Display.V1.FormattedValue"] || '',
                eventtype: event["sa_eventtype@OData.Community.Display.V1.FormattedValue"] || ''
            }));
        } else {
            return [];
        }
    },

    // Get event details
    getEventDetails: async (eventId) => {
        const headers = new Headers();
        headers.append('eventId', eventId);

        return await apiCall(API_ENDPOINTS.GET_EVENT_DETAILS, {
            method: 'GET',
            headers,
            redirect: 'follow'
        });
    },

    // Register for event
    registerForEvent: async (eventId, email, name) => {
        const headers = new Headers();
        headers.append('eventId', eventId);
        headers.append('email', email);
        headers.append('name', name);

        return await apiCall(API_ENDPOINTS.REGISTER_EVENT, {
            method: 'POST',
            headers,
            redirect: 'follow'
        });
    }
};

/**
 * Certificates API
 */
export const certificatesAPI = {
    getCertificates: async (email) => {
        const headers = new Headers();
        headers.append('email', email);

        const response = await fetch(API_ENDPOINTS.GET_CERTIFICATES, {
            method: 'GET',
            headers,
            redirect: 'follow'
        });

        if (response.status === 200) {
            return await response.json();
        } else {
            return [];
        }
    }
};

/**
 * Team & Community APIs
 */
export const communityAPI = {
    getTeamMembers: async () => {
        const response = await fetch(API_ENDPOINTS.GET_TEAM_MEMBERS, {
            method: 'GET',
            redirect: 'follow'
        });

        if (response.status === 200) {
            const data = await response.json();
            // Transform property names for React components
            return data.map(member => ({
                contactid: member.sa_contactid,
                fullname: `${member.sa_firstname || ''} ${member.sa_lastname || ''}`.trim(),
                firstname: member.sa_firstname,
                lastname: member.sa_lastname,
                jobtitle: member.sa_designation,
                emailaddress1: member.sa_email || member.emailaddress1,
                entityimage: member.sa_imageurl || member.entityimage,
                designation: member.sa_designation,
                facebook: member.sa_facebook,
                linkedin: member.sa_linkedin,
                instagram: member.sa_instagram
            }));
        } else {
            return [];
        }
    },

    getCommunityMembers: async () => {
        return await apiCall(API_ENDPOINTS.GET_COMMUNITY_MEMBERS, {
            method: 'GET',
            redirect: 'follow'
        });
    }
};

/**
 * Support & Contact APIs
 */
export const supportAPI = {
    submitSupport: async (name, email, message) => {
        const headers = new Headers();
        headers.append('name', name);
        headers.append('email', email);
        headers.append('message', message);

        return await apiCall(API_ENDPOINTS.CONTACT_SUPPORT, {
            method: 'POST',
            headers,
            redirect: 'follow'
        });
    },

    getSocials: async () => {
        const response = await fetch(API_ENDPOINTS.GET_SOCIALS, {
            method: 'GET',
            redirect: 'follow'
        });

        if (response.status === 200) {
            const data = await response.json();
            // Transform sa_name -> name, sa_url -> url for React components
            return data.map(item => ({
                name: item.sa_name,
                url: item.sa_url,
                icon: item.sa_icon || '🌐'
            }));
        } else {
            return [];
        }
    }
};

export default {
    authAPI,
    userAPI,
    eventsAPI,
    certificatesAPI,
    communityAPI,
    supportAPI
};
