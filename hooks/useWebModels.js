// hooks/useWebModels.js
import { useEffect, useState } from "react";
import * as blazeface from "@tensorflow-models/blazeface";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";

export default function useWebModels() {
  const [ready, setReady] = useState(false);
  const [faceModel, setFaceModel] = useState(null);

  useEffect(() => {
    (async () => {
      await tf.ready();
      const loadedFaceModel = await blazeface.load();

      setFaceModel(loadedFaceModel);
      setReady(true);
    })();
  }, []);

  return { faceModel, ready };
}
