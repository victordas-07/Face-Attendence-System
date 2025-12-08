import React, { useState, useRef } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Camera, CameraType } from "expo-camera";
import Loader from "../components/Loader";
import { saveFace } from "../services/faceStore";
import { extractEmbedding } from "../utils/embedding";
import useTFLite from "../hooks/useTFLite";
import useBlinkDetection from "../hooks/useBlinkDetection";
import useFaceDetection from "../hooks/useFaceDetection";

export default function RegisterFaceScreen() {
  const [name, setName] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [loading, setLoading] = useState(false);

  const cameraRef = useRef(null);
  const { tflite, ready } = useTFLite();
  const { bbox, detectFace } = useFaceDetection();
  const { blinked, checkBlink, reset } = useBlinkDetection();

  React.useEffect(() => {
    Camera.requestCameraPermissionsAsync().then((res) => {
      setHasPermission(res.status === "granted");
    });
  }, []);

  const captureFace = async () => {
    if (!cameraRef.current || !ready) return;
    if (!name.trim()) return alert("Enter Name");

    setLoading(true);

    const photo = await cameraRef.current.takePictureAsync({ base64: true });

    tflite.runModelOnImage(
      {
        imageData: photo.base64,
        numResults: 1,
      },
      async (err, res) => {
        if (err) {
          console.log(err);
          setLoading(false);
          return;
        }

        const embedding = extractEmbedding(res);

        await saveFace(name, embedding);

        alert(`${name} registered successfully!`);
        setLoading(false);
        reset();
      }
    );
  };

  if (hasPermission === null) return <Text>Requesting camera...</Text>;
  if (hasPermission === false) return <Text>No access to camera.</Text>;

  return (
    <View style={{ flex: 1 }}>
      {loading && <Loader text="Processing..." />}

      <Camera
        style={{ flex: 1 }}
        ref={cameraRef}
        type={CameraType.front}
        onFacesDetected={({ faces }) => {
          detectFace(faces);
          if (faces[0]?.leftEyeOpenProbability && faces[0]?.rightEyeOpenProbability) {
            checkBlink(
              faces[0].leftEyeOpenProbability,
              faces[0].rightEyeOpenProbability
            );
          }
        }}
        faceDetectorSettings={{
          mode: "accurate",
          detectLandmarks: "all",
          runClassifications: "all",
        }}
      />

      <View style={styles.bottom}>
        <TextInput
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <Button
          title={blinked ? "Capture Face" : "Blink to Verify"}
          onPress={captureFace}
          disabled={!blinked}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottom: {
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});
