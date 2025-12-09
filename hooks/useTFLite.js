// hooks/useTFLite.js
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import Tflite from "react-native-tflite";
import { Asset } from "expo-asset";

export default function useTFLite() {
  const [tflite, setTflite] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (Platform.OS === "web") return;

    (async () => {
      const tfliteInstance = new Tflite();

      const faceDetAsset = Asset.fromModule(require("../assets/models/face_detection.tflite"));
      const recogAsset = Asset.fromModule(require("../assets/models/face_recognition.tflite"));
      const spoofAsset = Asset.fromModule(require("../assets/models/anti_spoofing.tflite"));

      await faceDetAsset.downloadAsync();
      await recogAsset.downloadAsync();
      await spoofAsset.downloadAsync();

      tfliteInstance.loadModel(
        {
          model: faceDetAsset.localUri,
          labels: "",
        },
        err => console.log("Face Detection Model Loaded:", err)
      );

      tfliteInstance.loadModel(
        {
          model: recogAsset.localUri,
          labels: "",
        },
        err => console.log("Face Recognition Loaded:", err)
      );

      tfliteInstance.loadModel(
        {
          model: spoofAsset.localUri,
          labels: "",
        },
        err => console.log("Anti Spoof Loaded:", err)
      );

      setTflite(tfliteInstance);
      setReady(true);
    })();
  }, []);

  return { tflite, ready };
}
