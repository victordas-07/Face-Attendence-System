// utils/firebase.js
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:xxxxxxxxxxxx"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

// -------------------------------
// Save face embedding
// -------------------------------
export async function saveEmbedding(userId, embedding) {
  await setDoc(doc(db, "faces", userId), {
    embedding,
    createdAt: Date.now(),
  });
}

// -------------------------------
// Load face embedding
// -------------------------------
export async function loadEmbedding(userId) {
  const snap = await getDoc(doc(db, "faces", userId));
  return snap.exists() ? snap.data().embedding : null;
}

// -------------------------------
// Mark attendance
// -------------------------------
export async function saveAttendance(userId, status = "present") {
  await addDoc(collection(db, "attendance"), {
    userId,
    status,
    timestamp: Date.now(),
  });
}

// -------------------------------
// Upload face image to Firebase Storage
// -------------------------------
export async function uploadFaceImage(userId, fileBlob) {
  const storageRef = ref(storage, `faces/${userId}.jpg`);
  await uploadBytes(storageRef, fileBlob);
  return await getDownloadURL(storageRef);
}
