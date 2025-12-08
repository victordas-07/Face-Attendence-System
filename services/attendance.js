import { db } from "../utils/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const markAttendance = async (name) => {
  await addDoc(collection(db, "attendance"), { name, time: new Date().toISOString() });
};

export const getAttendance = async () => {
  const snapshot = await getDocs(collection(db, "attendance"));
  const list = [];
  snapshot.forEach(doc => list.push(doc.data()));
  return list;
};
