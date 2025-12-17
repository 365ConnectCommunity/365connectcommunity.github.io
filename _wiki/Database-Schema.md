# Database Schema 🗄️

We use **Cloud Firestore** (NoSQL).

> **Pro Tip**: NoSQL documents are flexible, but we enforce specific structures in our code.

## Collections

### `users`
Stores user profile information.
*   **ID**: User UID (from Auth)
*   **Fields**:
    *   `email` (string)
    *   `name` (string)
    *   `role` (string): 'admin' | 'user'
    *   `photoURL` (string)
    *   `linkedin` (string)
    *   `bio` (string)

### `events`
Upcoming and past events.
*   **ID**: Auto-generated
*   **Fields**:
    *   `title` (string)
    *   `date` (timestamp)
    *   `description` (string)
    *   `imageUrl` (string)
    *   `registrationLink` (string)
    *   `status` (string): 'upcoming' | 'past'

### `certificates`
Certificates issued to users.
*   **ID**: Certificate ID
*   **Fields**:
    *   `recipientName` (string)
    *   `recipientEmail` (string) - *Used for querying user certificates*
    *   `issueDate` (timestamp)
    *   `courseName` (string)
    *   `downloadUrl` (string)

### `blogs`
Community blog posts.
*   **ID**: Auto-generated or Slug
*   **Fields**:
    *   `title` (string)
    *   `content` (string/html)
    *   `author` (string)
    *   `authorId` (string)
    *   `tags` (array)
    *   `status` (string): 'draft' | 'published'

---
*Refer to `src/services/firebase.js` for implementation details.*
