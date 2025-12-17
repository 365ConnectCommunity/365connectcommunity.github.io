# Project Structure 📂

Here is an overview of the key files and directories in the repository.

```
365connectcommunity.github.io/
├── .github/                # GitHub Actions workflows (Deployment)
├── _wiki/                  # This documentation!
├── admin/                  # Admin-specific logic (legacy/deprecated, most moved to src/pages/admin)
├── android/                # Native Android project (Capacitor)
├── ios/                    # Native iOS project (Capacitor)
├── public/                 # Static assets (images, favicon)
├── src/
│   ├── components/         # Reusable React components (Header, Footer, inputs)
│   ├── data/               # Static JSON data files (e.g., courses.js)
│   ├── pages/              # Main route components
│   │   ├── admin/          # Admin Dashboard pages (ProtectedRoute)
│   │   └── ...             # Public pages (Home, Events, etc.)
│   ├── services/           # External service logic (Firebase config)
│   ├── styles/             # Global CSS
│   ├── App.jsx             # Main App component & Router definition
│   └── main.jsx            # Entry point
├── .env.example            # Template for environment variables
├── capacitor.config.json   # Capacitor configuration
├── package.json            # Dependencies and scripts
└── vite.config.js          # Vite build configuration
```

## Key Directories Explained

*   **`src/pages`**: Contains the main "Views" of the application. Each file generally corresponds to a Route.
*   **`src/components`**: Smaller building blocks like `Navbar`, `EventCard`, etc.
*   **`src/services/firebase.js`**: Centralized Firebase initialization and exports (`db`, `auth`).
*   **`android/` & `ios/`**: These are **generated** and **synced** by Capacitor. You rarely edit code here manually unless configuring native permissions (like Camera access).
