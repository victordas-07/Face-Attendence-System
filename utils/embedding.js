// utils/embedding.js
export function getEmbeddingFromTFLite(tflite, faceImagePath) {
  return new Promise((resolve) => {
    tflite.runModelOnImage(
      {
        path: faceImagePath,
        imageMean: 0,
        imageStd: 255,
      },
      (err, res) => {
        if (err || !res) return resolve(null);
        resolve(Object.values(res)); // 128D or 512D vector
      }
    );
  });
}

export async function getEmbeddingWeb(faceTensor, model) {
  const embedding = await model.predict(faceTensor).data();
  return Array.from(embedding);
}
