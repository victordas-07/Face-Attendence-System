// components/FaceBox.js
import React from "react";
import { View } from "react-native";

export default function FaceBox({ box, color = "lime" }) {
  if (!box) return null;

  return (
    <View
      style={{
        position: "absolute",
        top: box.y,
        left: box.x,
        width: box.width,
        height: box.height,
        borderWidth: 3,
        borderColor: color,
        zIndex: 999,
      }}
    />
  );
}
