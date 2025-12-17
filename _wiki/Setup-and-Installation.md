# Setup and Installation 🛠️

Follow these steps to get the project running on your local machine.

## Prerequisites

Ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (Version 18+ recommended)
*   [Git](https://git-scm.com/)
*   **Optional (for Mobile)**: Android Studio and/or Xcode

## 1. Clone the Repository

```bash
git clone https://github.com/365connectcommunity/365connectcommunity.github.io.git
cd 365connectcommunity.github.io
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Environment Setup

1.  Copy the example environment file:
    ```bash
    cp .env.example .env
    ```
2.  Open `.env` and fill in your Firebase credentials.
    > **Note**: You can get these details from the Firebase Console Project Settings.

## 4. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## 5. Mobile Setup (Optional)

To run the mobile versions, see the **[Mobile Development](Mobile-Development)** guide.
