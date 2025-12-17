# Mentorship & Contributors 🤝

We believe in the power of "Learn, Teach, Collaborate". Moving from a User to a Contributor is a major milestone in our community.

## Roles Explained

### 🟢 User (Member)
*   Can attend events.
*   Can read blogs.
*   Can learn from courses.

### 🔵 Contributor
A verified expert or active community member who gives back.
*   **Capabilities**:
    *   Access to the **Admin Dashboard** (restricted view).
    *   Can **Write Blog Posts**.
    *   Can **Propose Events**.
*   **How to become one**:
    1.  Go to **Become a Contributor** in the footer or menu.
    2.  Fill out the application form (Portfolio, LinkedIn, Reason).
    3.  Wait for Admin approval.

### 🔴 Admin
Platform maintainers.
*   Full access to all data.
*   Can approve Contributors.
*   Can issue Certificates.

### ⚫ Super Admin
*   Has special privileges (like hard-delete).
*   *Currently identified by specific email checks in the code.*

## The Mentorship Program
(Coming Soon)
We are building a structured mentorship program where Contributors can officially mentor students.
*   **Mentors**: Experienced professionals.
*   **Mentees**: Students or career switchers.

## For Developers: The "Contributor" Role Code
In the database (`users` collection), the `role` field determines access:
*   `user` (default)
*   `contributor`
*   `admin`

The `AdminRoute` component checks this field to grant access to `/admin` routes. Contributors have a limited view within the admin panel compared to full Admins.
