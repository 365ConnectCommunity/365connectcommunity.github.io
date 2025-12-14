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

## 4. Feature: Data Migration (Legacy to Firestore)
#### [NEW] [AdminMigration.jsx](file:///Users/shaheerahmad/Documents/GitHub/365connectcommunity.github.io/src/pages/admin/AdminMigration.jsx)
- **Purpose**: A dedicated admin page to trigger data migration from legacy Azure Logic Apps APIs.
- **Migration Logic**:
    1.  **Migrate Users**:
        - Source: `https://prod-107.westeurope.logic.azure.com:443/workflows/911c8454b01946eb88b33cc200e0cc33/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=lVzW4lLPwwAwwok5lGZ7WzaEBM2UW6r_-40cUwE86vQ`
        - Dest: `users` collection.
        - *Note*: If API only provides names, we might need to rely on login creation or iterate if email is available.
    2.  **Migrate Events**:
        - Source: `https://prod-219.westeurope.logic.azure.com:443/workflows/08239d2cedcf41fc9fc197aacd628218/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=0mXHdglVvx_N1yD8YvLMm5vGq67z3X8vny11Y3UbL7U`
        - Dest: `events` collection.
    3.  **Migrate Team**:
        - Source: `https://prod-72.westeurope.logic.azure.com:443/workflows/957b2e51c16540ff8c63857a67a6a0e6/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=VZ_w69-oK1l9eSjf83FxPTXDpqr-GnposYU1D15354g`
        - Dest: `team_members` collection.
    4.  **Migrate Certificates & Registrations** (Iterative):
        - Prerequisite: Must have fetched Users first to get Emails.
        - **Certificates**: `https://prod-211.westeurope.logic.azure.com:443/workflows/50594cb1227741739216cf63fcdec0af/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=UO7we7Jqp5hQiuTNZdjzZHTW3ULsb_WTL3yZCf6wp6k` (Header: `email`)
        - **Registrations**: `https://prod-220.westeurope.logic.azure.com:443/workflows/66e34ad255f1445d9efae36cc77c1825/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=13kRhYkPXo5PI3kaeD9fXVgZhMqWIJwPF84o3FUMNnY` (Header: `email`)
    5.  **Migrate Socials**:
        - Source: `https://prod-28.westeurope.logic.azure.com...` (Legacy `our-socials.html`)
        - Dest: `socials` collection (optional, or hardcode).

## Verification
1. Apply as a contributor.
2. Login as Super Admin, approve application.
3. Login as new Contributor, verify limited access (No Users tab, only My Events).
4. Verify Super Admin still has full access.
5. **Run Migrations** from `AdminMigration` and verify Firestore data population.
