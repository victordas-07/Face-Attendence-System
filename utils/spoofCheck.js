// utils/spoofCheck.js
export function runAntiSpoofing(tflite, imagePath) {
  return new Promise((resolve) => {
    tflite.runModelOnImage(
      {
        path: imagePath,
        imageMean: 0,
        imageStd: 255,
      },
      (err, res) => {
        if (err || !res) return resolve("UNKNOWN");

        const score = res[0]?.confidence || 0;

        resolve(score > 0.6 ? "REAL" : "FAKE");
      }
    );
  });
}
