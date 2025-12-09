import { db } from "../utils/firebase";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";

export const saveFace = async (name, embedding) => {
  await setDoc(doc(db, "faces", name), { embedding });
};

export const getFaces = async () => {
  const facesCol = collection(db, "faces");
  const facesSnap = await getDocs(facesCol);
  const faces = {};
  facesSnap.forEach(doc => faces[doc.id] = doc.data().embedding);
  return faces;
};
