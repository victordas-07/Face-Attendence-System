import * as tf from "@tensorflow/tfjs";

export const preprocessFace = (tensor) => {
  return tf.tidy(() => {
    return tf.image
      .resizeBilinear(tensor, [112, 112])
      .div(255)
      .expandDims(0);
  });
};
