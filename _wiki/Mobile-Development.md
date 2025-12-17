# Mobile Development 📱

The project uses **[Capacitor](https://capacitorjs.com/)** to wrap the web application into native iOS and Android apps.

## Prerequisites

*   **Android**: Install [Android Studio](https://developer.android.com/studio).
*   **iOS**: Install [Xcode](https://developer.apple.com/xcode/) (macOS only).
*   **CocoaPods** (for iOS): `sudo gem install cocoapods`

## Workflow

### 1. Develop on Web First
Make your changes in React (`src/`) and test them in the browser (`npm run dev`).

### 2. Sync to Native
Once you are happy with the changes, build and sync them to the native projects:

```bash
npm run build
npx cap sync
```
This command copies the built assets (`dist/`) into the `android/` and `ios/` folders.

### 3. Run on Device/Simulator

**Android:**
```bash
npx cap open android
```
*   Android Studio will open.
*   Wait for Gradle sync.
*   Click the "Run" (Green Play) button.

**iOS:**
```bash
npx cap open ios
```
*   Xcode will open.
*   Select a Simulator (e.g., iPhone 15).
*   Click the "Play" button.

## Troubleshooting

*   **"Google Services Missing"**: If using Firebase Native plugins, ensure `google-services.json` (Android) and `GoogleService-Info.plist` (iOS) are placed in the correct native folders.
*   **Assets not updating**: Did you run `npm run build` before syncing? Capacitor syncs the *built* output, not the live source code.
