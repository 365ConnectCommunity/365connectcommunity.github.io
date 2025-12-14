# Firebase Firestore Schema Definition

This document outlines the schema for the Firestore database to ensure consistency with the application's requirements.

## 1. Users Collection (`users`)
Stores user profile information. Linked to Firebase Auth via `uid`.

| Field Name | Type | Description |
|---|---|---|
| `uid` | String | Unique User ID (from Authentication) |
| `email` | String | User's email address |
| `firstname` | String | First name |
| `lastname` | String | Last name |
| `phone` | String | Phone number (optional) |
| `createdAt` | Timestamp | Account creation date |
| `updatedAt` | Timestamp | Last update date |
| `role` | String | "member" or "admin" (default: "member") |

## 2. Events Collection (`events`)
Stores details of upcoming and past events.

| Field Name | Type | Description |
|---|---|---|
| `eventid` | String | Unique Event ID (Auto-generated or UUID) |
| `name` | String | Event Title |
| `description` | String | Detailed description |
| `startdate` | Timestamp | Start date and time |
| `enddate` | Timestamp | End date and time |
| `duration` | Number | Duration in minutes (calculated if needed) |
| `location` | String | Physical location or URL |
| `eventimage` | String | URL to event banner image |
| `registrationopen` | Boolean | Whether registration is active |
| `statuscode` | Number | 1: Active, 0: Inactive/Cancelled |
| `host` | String | Name of the host/organizer |
| `eventtype` | String | "Webinar", "Workshop", "Meetup", etc. |
| `createdon` | Timestamp | Record creation date |

## 3. Registrations Collection (`registrations`)
Links users to events they have registered for.

| Field Name | Type | Description |
|---|---|---|
| `registrationid` | String | Unique Registration ID |
| `eventid` | String | ID of the Event |
| `uid` | String | User ID of the registrant |
| `email` | String | User email (redundant but useful for queries) |
| `name` | String | Name used during registration |
| `registrationDate` | Timestamp | When they registered |
| `status` | String | "Confirmed", "Cancelled", "Attended" |

## 4. Certificates Collection (`certificates`)
Stores certificates issued to users.

| Field Name | Type | Description |
|---|---|---|
| `certificateid` | String | Unique Certificate ID |
| `name` | String | Certificate Name (e.g., "Completion of X") |
| `description` | String | Description of achievement |
| `issueddate` | Timestamp | Date of issue |
| `certificateurl` | String | Direct link to view/verify certificate |
| `image` | String | Thumbnail image URL |
| `uid` | String | User ID who owns this certificate |
| `recipientname` | String | Name on the certificate |
| `eventname` | String | Associated Event Name |
| `downloadlink` | String | Link to download PDF |

## 5. Team Members Collection (`team_members`)
Stores profiles for the "Meet the Team" page.

| Field Name | Type | Description |
|---|---|---|
| `contactid` | String | Unique ID |
| `firstname` | String | First Name |
| `lastname` | String | Last Name |
| `designation` | String | Job Title / Role |
| `email` | String | Contact Email |
| `imageurl` | String | Profile Picture URL |
| `facebook` | String | Facebook Profile URL |
| `linkedin` | String | LinkedIn Profile URL |
| `instagram` | String | Instagram Profile URL |
| `order` | Number | Display order (optional) |

## 6. Socials Collection (`socials`)
Stores social media links for the footer/contact page.

| Field Name | Type | Description |
|---|---|---|
| `id` | String | Unique ID |
| `name` | String | Platform Name (e.g., "LinkedIn") |
| `url` | String | Link URL |
| `icon` | String | Icon identifier or URL |

## 7. Support Messages Collection (`support_messages`)
Stores form submissions from the Contact/Support page.

| Field Name | Type | Description |
|---|---|---|
| `id` | String | Unique ID |
| `name` | String | Sender Name |
| `email` | String | Sender Email |
| `message` | String | Message content |
| `createdAt` | Timestamp | Time of submission |
| `status` | String | "New", "Read", "Replied" |
