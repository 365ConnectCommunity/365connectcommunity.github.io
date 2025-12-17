# Architecture & Tech Stack 🏗️

This project uses a modern **Serverless** architecture, leveraging the power of React for the frontend and Firebase for backend services.

## Overview Diagram

```mermaid
graph TD
    Client[React Client]
    Mobile[Mobile Apps (Capacitor)]
    Firebase[Firebase Services]
    GH[GitHub Pages]

    Client -->|Auth, Data| Firebase
    Mobile -->|Wrap| Client
    Client -->|Hosting| GH
    
    subgraph Firebase Services
        Auth[Authentication]
        DB[Firestore NoSQL]
        Storage[File Storage]
    end
```

## Technology Stack

### Frontend Core
*   **[React](https://react.dev/)**: Main UI library.
*   **[Vite](https://vitejs.dev/)**: Next-generation frontend tooling for fast builds.
*   **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for styling.
*   **[React Router](https://reactrouter.com/)**: Handling navigation and routing.

### Data & Backend
*   **[Firebase Authentication](https://firebase.google.com/docs/auth)**: Handles user signup, login (Email/Password, Google).
*   **[Cloud Firestore](https://firebase.google.com/docs/firestore)**: NoSQL real-time database.
*   **[Firebase Storage](https://firebase.google.com/docs/storage)**: Storing user uploads (profile pictures, event banners).

### Mobile
*   **[Capacitor](https://capacitorjs.com/)**: Cross-platform native runtime. Allows us to deploy the web app as a native iOS and Android app.

### Deployment / DevOps
*   **GitHub Actions**: CI/CD pipelines to build and deploy.
*   **GitHub Pages**: Hosting the static web application.

## Key Design Principles
1.  **Responsive First**: Designed to look great on mobile and desktop.
2.  **Component-Based**: Reusable UI components (in `src/components`).
3.  **Secure by Default**: Using Firestore Security Rules and Environment Variables.
