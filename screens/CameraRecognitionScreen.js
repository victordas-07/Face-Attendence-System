import React, { useRef, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import Loader from "../components/Loader";
import { getFaces } from "../services/faceStore";
import { markAttendance } from "../services/attendance";
import { compareEmbedding } from "../utils/faceCompare";
import { extractEmbedding } from "../utils/embedding";
import useTFLite from "../hooks/useTFLite";
import useFaceDetection from "../hooks/useFaceDetection";
import useBlinkDetection from "../hooks/useBlinkDetection";

export default function CameraRecognitionScreen() {
  const cameraRef = useRef(null);
  const { tflite, ready } = useTFLite();
  const { bbox, detectFace } = useFaceDetection();
  const { blinked, checkBlink, reset } = useBlinkDetection();

  const [loading, setLoading] = useState(false);
  const [recognized, setRecognized] = useState(null);

  const recognizeFace = async () => {
    if (!cameraRef.current || !ready) return;

    setLoading(true);

    const photo = await cameraRef.current.takePictureAsync({ base64: true });

    tflite.runModelOnImage({ imageData: photo.base64 }, async (_, result) => {
      const embedding = extractEmbedding(result);

      const dbFaces = await getFaces();

      let best = { name: null, dist: 999 };

      for (let name in dbFaces) {
        const dist = compareEmbedding(embedding, dbFaces[name]);
        if (dist < best.dist) best = { name, dist };
      }

      if (best.dist < 0.70) {
        setRecognized(best.name);
        await markAttendance(best.name);
        alert(`Attendance marked: ${best.name}`);
      } else {
        setRecognized("Unknown");
      }

      setLoading(false);
      reset();
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && <Loader text="Recognizing..." />}

      <Camera
        style={{ flex: 1 }}
        ref={cameraRef}
        onFacesDetected={({ faces }) => {
          detectFace(faces);
          if (faces[0]?.leftEyeOpenProbability && faces[0]?.rightEyeOpenProbability) {
            checkBlink(
              faces[0].leftEyeOpenProbability,
              faces[0].rightEyeOpenProbability
            );
          }
        }}
      />

      <View style={styles.bottom}>
        <Button
          title={blinked ? "Recognize Face" : "Blink to Verify"}
          disabled={!blinked}
          onPress={recognizeFace}
        />

        {recognized && <Text style={styles.recogText}>Result: {recognized}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottom: { padding: 20, backgroundColor: "#fff" },
  recogText: { fontSize: 20, marginTop: 10, textAlign: "center" },
});
