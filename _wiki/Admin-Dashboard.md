# Admin Dashboard 🛡️

The Admin Dashboard provides tools to manage the community.

**Access URL**: `/admin`  
**Requirement**: User must have `role: 'admin'` in their Firestore document.

## Features

### 1. User Management
*   View all registered users.
*   Search users by name/email.
*   (Future) Promoting users to admin.

### 2. Content Management (CMS)
*   **Events**: Create, Edit, and Delete events. Upload banners directly to Firebase Storage.
*   **Blogs**: Review contributor submissions. Publish or Reject drafts. 
    *   *Preview Feature*: Admins can preview blog posts before publishing.

### 3. Certificates
*   Issue new certificates.
*   View history of issued certificates.

## Security
The admin routes are protected by the `AdminRoute` component (`src/components/AdminRoute.jsx`).
*   It checks the current user's claims/role.
*   If not an admin, redirects to Home.
