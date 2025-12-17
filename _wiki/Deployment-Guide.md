# Deployment Guide 🚀

This project uses **GitHub Actions** to automate deployment to **GitHub Pages**.

## How it Works

The workflow is defined in `.github/workflows/deploy.yml`.

1.  **Trigger**: Code is pushed to the `main` or `master` branch.
2.  **Build**:
    *   Ubuntu runner starts.
    *   Node.js is installed.
    *   `npm ci` installs dependencies.
    *   **Secrets Injection**: The workflow reads secrets from the Repository Settings (`VITE_FIREBASE_...`) and injects them into the build process.
    *   `npm run build` compiles the React code into the `dist/` folder.
3.  **Deploy**: The content of `dist/` is uploaded to GitHub Pages.

## Managing Secrets 🔐

The application **requires** API keys to function. These are **not** committed to the repo.

**To add secrets:**
1.  Go to Repository Settings -> Secrets and variables -> Actions.
2.  Add the following secrets (values found in your local `.env` or Firebase Console):
    *   `VITE_FIREBASE_API_KEY`
    *   `VITE_FIREBASE_AUTH_DOMAIN`
    *   `VITE_FIREBASE_PROJECT_ID`
    *   `VITE_FIREBASE_STORAGE_BUCKET`
    *   `VITE_FIREBASE_MESSAGING_SENDER_ID`
    *   `VITE_FIREBASE_APP_ID`
    *   `VITE_FIREBASE_MEASUREMENT_ID`

> **Warning**: If you add new environment variables for features, you MUST add them to GitHub Secrets, or the deployed site will break.
