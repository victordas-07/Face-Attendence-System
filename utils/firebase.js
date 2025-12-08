import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "ID",
  appId: "APPID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const markAttendance = async (name) => {
  const ref = doc(db, "attendance", name);
  const timestamp = new Date().toISOString();

  await setDoc(ref, { name, lastSeen: timestamp }, { merge: true });
};
