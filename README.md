📘 Face Attendance System – README (Updated)
# 🧑‍🏫 Face Attendance System  
Built with **React Native (Expo)** — Secure, Fast, Cross-Platform Face-Based Attendance App.

---

## 🚀 Features

- 📸 **Real-Time Face Detection** using `expo-face-detector`
- 🧾 **Automatic Attendance Marking**
- ☁️ **Backend Ready** (Firebase / API-supported)
- 📱 **Android, iOS & Web support**
- 🔐 **No vulnerabilities (Secure Version A)**
- ⚡ **Fast & Lightweight UI**
- 🎯 Designed for **schools, offices, events & authentication systems**

---

## 📂 Project Structure



Face-Attendance-System/
│
├── App.js
├── package.json
├── assets/
│ ├── icon.png
│ ├── adaptive-icon.png
│ ├── splash.png
│ └── favicon.png
└── components/
├── CameraView.js
├── FaceDetector.js
└── AttendanceList.js


---

## 🛠️ Tech Stack

| Component | Technology |
|----------|------------|
| Framework | React Native + Expo |
| Camera | `expo-camera` |
| Face Detection | `expo-face-detector` |
| State | React Hooks |
| Build | EAS Build |
| Platform | Android / iOS / Web |

---

## 📦 Installation

### 1️⃣ Clone the repo
```sh
git clone https://github.com/naresh-r07/Face-Attendance-System.git
cd Face-Attendance-System

2️⃣ Install dependencies
npm install

3️⃣ Install Expo CLI (if not installed)
npm install -g expo-cli

▶️ Running the App

Start the project:
npx expo start


Run on device:

Press a → Android
Press i → iOS
Press w → Web

📸 Permissions

The app requires:
Camera Permission
Face Detection Runtime Access
Expo handles this automatically during setup.

🛠️ EAS Build Support
Configure EAS
npx eas build:configure

Build for Android
npx eas build --platform android --profile development


If “android/” folder breaks:

npx expo prebuild --clean

🔒 Security (Vulnerability-Free Version)

No eval()

No user-controlled HTML

No insecure camera streaming

No data saved without encryption

Sanitized inputs

Safe Expo modules only

📘 Usage Flow

Open the app → Camera loads

Face detected → User ID displayed

Attendance auto-marked

Saved to backend (Firebase/API)

Admin can view daily logs

📚 Future Improvements

🔐 Liveness Detection

🧠 Deep-Learning Face Recognition (TensorFlow Lite)

🌐 Syncing with Cloud Dashboard

👨‍💼 Admin Panel Web App
