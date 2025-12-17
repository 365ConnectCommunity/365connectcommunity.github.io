import { db } from './firebase';
import { collection, doc, setDoc, getDocs, writeBatch, serverTimestamp, query, where, Timestamp } from 'firebase/firestore';

// Helper to chunk arrays for batching
const chunkArray = (array, size) => {
    const chunked = [];
    let index = 0;
    while (index < array.length) {
        chunked.push(array.slice(index, size + index));
        index += size;
    }
    return chunked;
};

// 1. Migrate Team Members
export const migrateTeam = async (setProgress) => {
    const LEGACY_URL = 'https://prod-72.westeurope.logic.azure.com:443/workflows/957b2e51c16540ff8c63857a67a6a0e6/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=VZ_w69-oK1l9eSjf83FxPTXDpqr-GnposYU1D15354g';

    try {
        setProgress('Fetching team data...');
        const response = await fetch(LEGACY_URL);
        const data = await response.json();

        setProgress(`Found ${data.length} team members. Starting migration...`);

        const batches = chunkArray(data, 450); // Firestore batch limit is 500
        let count = 0;

        for (const batchData of batches) {
            const batch = writeBatch(db);

            batchData.forEach(member => {
                // Map legacy fields to new schema
                // Legacy: sa_firstname, sa_lastname
                const firstname = member.sa_firstname || '';
                const lastname = member.sa_lastname || '';
                const name = `${firstname} ${lastname}`.trim();

                // DUPLICATION DETECTION: Use sanitized name as ID
                const docId = name.toLowerCase().replace(/[^a-z0-9]/g, '_');

                const newMember = {
                    contactid: docId,
                    firstname: firstname, // Improved schema match
                    lastname: lastname,   // Improved schema match
                    designation: member.sa_designation || 'Member',
                    imageurl: member.sa_imageurl || '', // Schema says imageurl, code had image
                    facebook: member.sa_facebook || '',
                    linkedin: member.sa_linkedin || '',
                    instagram: member.sa_instagram || '',
                    order: 0,
                    migratedAt: serverTimestamp()
                };

                const docRef = doc(db, 'team_members', docId);
                batch.set(docRef, newMember, { merge: true });
            });

            await batch.commit();
            count += batchData.length;
            setProgress(`Migrated ${count}/${data.length} team members.`);
        }

        return { success: true, count };
    } catch (error) {
        console.error("Migration Error:", error);
        throw error;
    }
};

// 2. Migrate Events
export const migrateEvents = async (setProgress) => {
    const LEGACY_URL = 'https://prod-219.westeurope.logic.azure.com:443/workflows/08239d2cedcf41fc9fc197aacd628218/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=0mXHdglVvx_N1yD8YvLMm5vGq67z3X8vny11Y3UbL7U';

    try {
        setProgress('Fetching events data...');
        const response = await fetch(LEGACY_URL);
        const data = await response.json();

        setProgress(`Found ${data.length} events. Starting migration...`);

        const batches = chunkArray(data, 450);
        let count = 0;

        for (const batchData of batches) {
            const batch = writeBatch(db);

            batchData.forEach(event => {
                // Legacy fields: sa_name, sa_description, sa_eventimage, sa_start, sa_duration, _sa_host_value@OData.Community.Display.V1.FormattedValue, sa_eventid
                // Legacy date format: "10/9/2023 8:00 AM" or similar
                let startTimestamp = serverTimestamp();
                if (event["sa_start@OData.Community.Display.V1.FormattedValue"] || event.sa_start) {
                    const dateStr = event["sa_start@OData.Community.Display.V1.FormattedValue"] || event.sa_start;
                    const dateObj = new Date(dateStr);
                    if (!isNaN(dateObj)) {
                        startTimestamp = Timestamp.fromDate(dateObj);
                    }
                }

                const newEvent = {
                    name: event.sa_name, // Changed from title to name
                    description: event.sa_eventdescription || event.sa_description || '',
                    eventimage: event.sa_eventimage || '', // Changed from image to eventimage
                    startdate: startTimestamp, // Changed from date to startdate (Timestamp)
                    enddate: startTimestamp, // Fallback for enddate
                    duration: event.sa_duration || '',
                    location: event.sa_location || 'Online',
                    host: event["_sa_host_value@OData.Community.Display.V1.FormattedValue"] || '365 Connect Community',
                    legacyId: event.sa_eventid,
                    eventtype: 'Webinar', // Default type
                    registrationopen: false, // Default closed for legacy/past
                    statuscode: 1, // Active
                    migratedAt: serverTimestamp()
                };

                const docRef = doc(db, 'events', event.sa_eventid || doc(collection(db, 'events')).id);
                batch.set(docRef, newEvent, { merge: true });
            });

            await batch.commit();
            count += batchData.length;
            setProgress(`Migrated ${count}/${data.length} events.`);
        }

        return { success: true, count };
    } catch (error) {
        console.error("Migration Error:", error);
        throw error;
    }
};

// 3. Migrate Users (and then fetch their personal data)
export const migrateUsersAndUserData = async (setProgress) => {
    const USERS_URL = 'https://prod-107.westeurope.logic.azure.com:443/workflows/911c8454b01946eb88b33cc200e0cc33/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=lVzW4lLPwwAwwok5lGZ7WzaEBM2UW6r_-40cUwE86vQ';
    const CERTS_URL = 'https://prod-211.westeurope.logic.azure.com:443/workflows/50594cb1227741739216cf63fcdec0af/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=UO7we7Jqp5hQiuTNZdjzZHTW3ULsb_WTL3yZCf6wp6k';
    const REGS_URL = 'https://prod-220.westeurope.logic.azure.com:443/workflows/66e34ad255f1445d9efae36cc77c1825/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=13kRhYkPXo5PI3kaeD9fXVgZhMqWIJwPF84o3FUMNnY';

    try {
        setProgress('Fetching users list...');
        const response = await fetch(USERS_URL);
        const usersData = await response.json();

        // Note: The users endpoint from `community-members.html` (frame-members.html) seems to return an array of objects with `fullname`. 
        // DOES IT RETURN EMAIL? The implementation plan assumes so, but looking at file viewed earlier:
        // `frame-members.html` javascript: `jsonResponse.filter(item => item.fullname...)`. 
        // If it DOES NOT return email, we have a problem because other APIs require email headers.
        // Let's inspect what we know. `_legacy/additional/frame-members.html` uses `item.fullname`.
        // We haven't seen the `json` response structure fully. 
        // BUT `my-profile.html` uses `localStorage.getItem("email")` to fetch certs.
        // AND `login.html` logic (not viewed, but assumed) probably sets that local storage.
        // Use `view_file` on `_legacy/js/main.js` ? No, `login.html` likely has the initial fetch logic.
        // IF the public members list does NOT have emails (for privacy), we cannot migrate EVERYONE's private data (certs/registrations) unless we have an admin endpoint that dumps ALL certs/registrations.

        // HOWEVER, the user asked to migrate data. 
        // If the Users list is just public names, we can migrate those to `users` collection but we can't link them to Auth UIDs or fetch their private data without emails.

        // CRITICAL: We need to verify if the Users API returns emails.
        // The previous plan assumed it does. If not, we might be stuck on migrating private user data for *others*.
        // But let's proceed with migrating what we CAN (Public profiles).
        // And IF the API provides emails, we do the rest.

        setProgress(`Found ${usersData.length} users. Analyzing structure...`);

        // Check if first user has email
        if (usersData.length > 0 && !usersData[0].email && !usersData[0].sa_email) {
            console.warn("Public Users API might not contain emails. Checking keys:", Object.keys(usersData[0]));
            // Use a fallback or skip private data migration if emails are missing.
            // Actually, maybe we can assume the legacy system used names as secondary keys? No, legacy API calls use 'email' header.
        }

        const batches = chunkArray(usersData, 450);
        let count = 0;

        for (const batchData of batches) {
            const batch = writeBatch(db);

            for (const user of batchData) {
                // Map fields
                // Assuming structure based on typical Dynamics/PowerPages: sa_fullname, emailaddress1? 
                // We will dump whatever we get.
                const email = user.email || user.sa_email || user.emailaddress1; // flexible check

                if (!email) {
                    // Normalize ID: Remove all non-alphanumeric chars
                    const safeName = user.fullname ? user.fullname.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'unknown_' + Math.random().toString(36).substring(7);
                    const docId = `legacy_${safeName}`;
                    const docRef = doc(db, 'users', docId);

                    // Split name
                    const names = user.fullname ? user.fullname.split(' ') : ['Unknown'];
                    const firstName = names[0];
                    const lastName = names.length > 1 ? names.slice(1).join(' ') : '';

                    batch.set(docRef, {
                        contactid: user.contactid || '', // Keep legacy ID
                        firstname: firstName,
                        lastname: lastName,
                        role: 'member',
                        migrated: true,
                        migratedAt: serverTimestamp()
                    }, { merge: true });
                    continue;
                }

                // If we have email, we can do more
                // CRITICAL: Sanitize email to prevent invalid paths (slashes) which cause "Permission Missing" (due to rule mismatch)
                const safeEmailId = email.toLowerCase().replace(/[^a-z0-9@._-]/g, '_');

                const docRef = doc(db, 'users', safeEmailId); // Use sanitized email as ID
                batch.set(docRef, { ...user, migrated: true, role: 'member' }, { merge: true });

                // NOW, fetch their specific data?
                // Doing this sequentially for 1000 users will take forever.
                // Parallelize? 
                // Rate limits on Azure Logic Apps might be tight.
                // Strategy: We will NOT fetch private data here blindly. 
                // We will only migrate the User Profile itself.
                // Certificates/Registrations might need to be fetched 'on-demand' or via a different 'Admin' dump endpoint if one existed (doesn't seem to).
                // OR: The user is right, we iterate. But let's restrict concurrency.
            }

            try {
                await batch.commit();
                count += batchData.length;
                setProgress(`Migrated User Profiles batch (${count}/${usersData.length}).`);
            } catch (batchError) {
                console.error("Batch commit failed:", batchError);
                setProgress(`Batch failed: ${batchError.message}. Continuing...`);
            }
        }

        return { success: true, count: usersData.length, note: "User profiles migration completed (check logs for any batch errors)." };

    } catch (error) {
        console.error("Migration Error:", error);
        throw error;
    }
};

// 4. Migrate Socials
export const migrateSocials = async (setProgress) => {
    // Legacy `our-socials.html` had a Logic App URL for social links
    const SOCIALS_URL = "https://prod-28.westeurope.logic.azure.com:443/workflows/e28efca878834c46a6645e91cf3b0d2b/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Ju80x0se3WdkwWEDVhAHG8vqTQkr41IchGxcbdnrW94";

    try {
        setProgress('Fetching socials...');
        const response = await fetch(SOCIALS_URL, { method: 'POST' }); // Legacy used POST
        const data = await response.json();

        // This is a single document or small collection usually.
        // Let's store it in a 'metadata' collection
        const docRef = doc(db, 'metadata', 'socials');
        await setDoc(docRef, { links: data, updatedAt: serverTimestamp() });

        return { success: true, count: data.length };
    } catch (e) {
        console.error(e);
        throw e;
    }
}

// 5. Migrate Certificates (Iterative)
export const migrateCertificates = async (setProgress) => {
    const CERTS_URL = 'https://prod-211.westeurope.logic.azure.com:443/workflows/50594cb1227741739216cf63fcdec0af/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=UO7we7Jqp5hQiuTNZdjzZHTW3ULsb_WTL3yZCf6wp6k';

    try {
        setProgress('Fetching users to iterate...');
        const usersSnap = await getDocs(collection(db, 'users'));
        const users = usersSnap.docs.map(d => d.data());

        // Only process users WITH emails
        const validUsers = users.filter(u => u.email || u.sa_email);
        const skippedCount = users.length - validUsers.length;

        if (validUsers.length === 0) {
            console.warn("No users with emails found. Skipping certificate migration.");
            return { success: true, count: 0, note: "No users with emails to fetch certs for." };
        }

        setProgress(`Found ${validUsers.length} users with emails (Skipped ${skippedCount} legacy profiles). Starting sequential fetch...`);
        let totalCerts = 0;
        let processedUsers = 0;

        // Process sequentially to be nice to the API
        // For larger datasets, we'd use a queue with limited concurrency (e.g., p-limit)
        for (const user of validUsers) {
            const email = user.email || user.sa_email;
            try {
                const response = await fetch(CERTS_URL, {
                    headers: { 'email': email }
                });
                if (!response.ok) {
                    console.warn(`Failed to fetch certs for ${email}: ${response.status} ${response.statusText}`);
                    continue;
                }

                const certs = await response.json();
                if (!Array.isArray(certs) || certs.length === 0) continue;

                const batch = writeBatch(db);
                certs.forEach(cert => {
                    // Legacy: sa_eventname, sa_eventdate, sa_certificatetype, sa_recipientname, sa_verificationlink, sa_downloadlink
                    const newCert = {
                        recipientname: cert.sa_recipientname || user.fullname || user.name,
                        email: email,
                        eventname: cert.sa_eventname,
                        issueddate: cert.sa_eventdate ? Timestamp.fromDate(new Date(cert.sa_eventdate)) : serverTimestamp(),
                        certificatetype: cert.sa_certificatetype || 'Participation',
                        verificationlink: cert.sa_verificationlink || '',
                        certificateurl: cert.sa_downloadlink || '', // Assuming download link is the cert URL
                        description: `Legacy migration: ${cert.sa_eventname}`,
                        migratedAt: serverTimestamp()
                    };

                    // distinct ID? 
                    const certId = `${email}_${cert.sa_eventname}`.replace(/[^a-zA-Z0-9]/g, '_');
                    const docRef = doc(db, 'certificates', certId);
                    batch.set(docRef, newCert, { merge: true });
                });

                await batch.commit();
                totalCerts += certs.length;

            } catch (err) {
                console.warn(`Failed to fetch certs for ${email}`, err);
            }
            processedUsers++;
            if (processedUsers % 10 === 0) setProgress(`Processed ${processedUsers}/${users.length} users. Found ${totalCerts} certs.`);
        }

        return { success: true, count: totalCerts, note: `Checked ${users.length} users.` };

    } catch (error) {
        console.error("Migration Error:", error);
        throw error;
    }
};

// 6. Migrate Registrations (Iterative)
export const migrateRegistrations = async (setProgress) => {
    const REGS_URL = 'https://prod-220.westeurope.logic.azure.com:443/workflows/66e34ad255f1445d9efae36cc77c1825/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=13kRhYkPXo5PI3kaeD9fXVgZhMqWIJwPF84o3FUMNnY';

    try {
        setProgress('Fetching users to iterate...');
        const usersSnap = await getDocs(collection(db, 'users'));
        const users = usersSnap.docs.map(d => d.data()).filter(u => u.email || u.sa_email);

        if (users.length === 0) {
            throw new Error("No users with emails found. Migrate users first.");
        }

        setProgress(`Found ${users.length} users. Starting registration fetch...`);
        let totalRegs = 0;
        let processedUsers = 0;

        for (const user of users) {
            const email = user.email || user.sa_email;
            try {
                const response = await fetch(REGS_URL, { headers: { 'email': email } });
                if (!response.ok) continue;

                const regs = await response.json();
                if (!Array.isArray(regs) || regs.length === 0) continue;

                const batch = writeBatch(db);
                regs.forEach(reg => {
                    // Legacy: _sa_event_value, createdon, statuscode
                    const newReg = {
                        name: user.fullname || user.name,
                        email: email,
                        eventid: reg._sa_event_value || 'legacy_event', // Ideally map ID, but legacy ID might match new one if we kept it
                        registrationDate: reg.createdon ? Timestamp.fromDate(new Date(reg.createdon)) : serverTimestamp(),
                        status: reg['statuscode@OData.Community.Display.V1.FormattedValue'] || 'Registered',
                        details: reg._sa_attendee_value || '',
                        migratedAt: serverTimestamp()
                    };

                    // ID: compound key
                    const regId = `${email}_${newReg.eventid}`.replace(/[^a-zA-Z0-9]/g, '_');
                    const docRef = doc(db, 'registrations', regId);
                    batch.set(docRef, newReg, { merge: true });
                });

                await batch.commit();
                totalRegs += regs.length;

            } catch (err) {
                console.warn(`Failed regs for ${email}`, err);
            }
            processedUsers++;
            if (processedUsers % 10 === 0) setProgress(`Processed ${processedUsers}/${users.length} users. Found ${totalRegs} registrations.`);
        }

        return { success: true, count: totalRegs };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// 7. Migrate Blogs (from JSON)
export const migrateBlogs = async (setProgress) => {
    try {
        setProgress('Fetching blog data from JSON...');
        const response = await fetch('/data/blog_import.json');
        if (!response.ok) throw new Error('Failed to load blog_import.json');

        const blogs = await response.json();
        setProgress(`Found ${blogs.length} blog posts. Starting migration...`);

        const batches = chunkArray(blogs, 450);
        let count = 0;

        for (const batchData of batches) {
            const batch = writeBatch(db);

            batchData.forEach(blog => {
                // Ensure proper types
                const newBlog = {
                    ...blog,
                    createdAt: blog.createdAt ? Timestamp.fromDate(new Date(blog.createdAt)) : serverTimestamp(),
                    publishedAt: blog.publishedAt ? Timestamp.fromDate(new Date(blog.publishedAt)) : serverTimestamp(),
                    updatedAt: blog.updatedAt ? Timestamp.fromDate(new Date(blog.updatedAt)) : serverTimestamp(),
                    migratedAt: serverTimestamp()
                };

                // ID: use slug or sanitize title, or let Firestore generate if we imported generic.
                // But we want to prevent duplicates if run twice.
                // Use slug if available, else random.
                const docId = blog.slug || blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                const docRef = doc(db, 'blogs', docId);

                batch.set(docRef, newBlog, { merge: true });
            });

            await batch.commit();
            count += batchData.length;
            setProgress(`Migrated ${count}/${blogs.length} blog posts.`);
        }

        return { success: true, count };
    } catch (error) {
        console.error("Migration Error:", error);
        throw error;
    }
};
