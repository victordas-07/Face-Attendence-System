// hooks/useFaceDetection.js
import { useCallback } from "react";

export default function useFaceDetection(tflite) {
  const detectFace = useCallback(
    (frame) => {
      if (!tflite) return null;

      return new Promise((resolve) => {
        tflite.runModelOnImage(
          {
            path: frame,
            imageMean: 0,
            imageStd: 255,
            threshold: 0.6,
          },
          (err, res) => {
            if (err || !res || res.length === 0) return resolve(null);

            const f = res[0];

            resolve({
              x: f.x,
              y: f.y,
              width: f.w,
              height: f.h,
            });
          }
        );
      });
    },
    [tflite]
  );

  return { detectFace };
}
