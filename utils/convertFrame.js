// utils/convertFrame.js
import * as FileSystem from "expo-file-system";

export async function convertFrameToJpeg(cameraRef) {
  if (!cameraRef) return null;

  const picture = await cameraRef.takePictureAsync({
    skipProcessing: true,
    quality: 0.6,
  });

  return picture.uri;
}
