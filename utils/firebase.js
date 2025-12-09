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
  apiKey: "AIzaSyCeT3bG0BHqkFnxvOArUbLXaVqwsRhATuM",
  authDomain: "face-attendance-system-f6853.firebaseapp.com",
  projectId: "face-attendance-system-f6853",
  storageBucket: "face-attendance-system-f6853.firebasestorage.app",
  messagingSenderId: "550987266598",
  appId: "1:550987266598:android:65eccae7e2cefbe4c904e7"
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
