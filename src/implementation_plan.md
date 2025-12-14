# Admin Portal & Contributor Workflow Implementation Plan

## Goal
Expand the Admin Portal to support a "Contributor" role. Contributors can manage their own events/content but cannot see system-wide users or team settings. "Super Admin" (`mianshaheerahmed@gmail.com`) retains full access. Add a functional "Become Contributor" application flow.

## Schema Updates
### [NEW] Collection: `contributor_applications`
- `id`: Auto-generated
- `uid`: User ID (if logged in)
- `name`: String
- `email`: String
- `reason`: String
- `portfolio`: String (URL)
- `status`: 'pending' | 'approved' | 'rejected'
- `createdAt`: Timestamp

## Feature Breakdown

### 1. Feature: Contributor Application
#### [MODIFY] [BecomeContributor.jsx](file:///Users/shaheerahmad/Documents/GitHub/365connectcommunity.github.io/src/pages/BecomeContributor.jsx)
- Rename/Update UI to "Contribute".
- Add Application Form (Name, Email, Reason to join, Portfolio Link).
- Submit to `contributor_applications` collection.

#### [NEW] [AdminApplications.jsx](file:///Users/shaheerahmad/Documents/GitHub/365connectcommunity.github.io/src/pages/admin/AdminApplications.jsx)
- List `pending` applications.
- Actions: Approve (Promote user to 'contributor' role, add to team), Reject.

### 2. Feature: Role-Based Access Control (RBAC)
#### [MODIFY] [AdminRoute.jsx](file:///Users/shaheerahmad/Documents/GitHub/365connectcommunity.github.io/src/components/admin/AdminRoute.jsx)
- Allow access if `user.role === 'contributor'` OR `user.role === 'admin'` OR `email === 'mianshaheerahmed@gmail.com'`.

#### [MODIFY] [AdminLayout.jsx](file:///Users/shaheerahmad/Documents/GitHub/365connectcommunity.github.io/src/components/admin/AdminLayout.jsx)
- Hide "Users", "Team", "Applications" links if user is NOT `mianshaheerahmed@gmail.com`.

#### [MODIFY] [AdminEvents.jsx](file:///Users/shaheerahmad/Documents/GitHub/365connectcommunity.github.io/src/pages/admin/AdminEvents.jsx)
- **Read**: If NOT Super Admin, only fetch events where `host` == user.name or `uid` == user.uid.
- **Create**: Auto-assign `host` as current user.

#### [MODIFY] [AdminRegistrations.jsx](file:///Users/shaheerahmad/Documents/GitHub/365connectcommunity.github.io/src/pages/admin/AdminRegistrations.jsx)
- If NOT Super Admin, filtering restrictions apply (can be complex, might restrict to just their events).

### 3. Bug Fixes
- **Login Error**: Catch Firestore write errors in `loginWithGoogle` and `login` within `apiService.js` so they don't block the UI if Auth succeeds.
- **AdminTeam Button**: Fix `onClick` handler in `AdminTeam.jsx`.

## Verification
1. Apply as a contributor.
2. Login as Super Admin, approve application.
3. Login as new Contributor, verify limited access (No Users tab, only My Events).
4. Verify Super Admin still has full access.
