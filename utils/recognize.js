import * as tf from "@tensorflow/tfjs";
import { preprocessFace } from "./preprocess";
import AsyncStorage from "@react-native-async-storage/async-storage";

let recognitionModel = null;

export const loadRecognitionModel = async () => {
  if (!recognitionModel) {
    recognitionModel = await tf.loadGraphModel(
      require("../ml/face_recognition.tflite")
    );
  }
  return recognitionModel;
};

export const recognizeFace = async (tensor) => {
  const model = await loadRecognitionModel();
  const processed = preprocessFace(tensor);

  const embedding = model.predict(processed).dataSync();

  // compare with saved DB
  const keys = await AsyncStorage.getAllKeys();
  const faces = keys.filter(k => k.startsWith("face_"));
  let best = "Unknown";
  let bestDist = 99;

  for (const f of faces) {
    const val = JSON.parse(await AsyncStorage.getItem(f));
    let sum = 0;
    for (let i = 0; i < val.length; i++) sum += (embedding[i] - val[i]) ** 2;
    const dist = Math.sqrt(sum);

    if (dist < bestDist && dist < 1.2) {
      bestDist = dist;
      best = f.replace("face_", "");
    }
  }

  return best;
};
