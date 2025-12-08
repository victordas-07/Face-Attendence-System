// hooks/useBlinkDetection.js
import { useState, useRef } from "react";

export default function useBlinkDetection() {
  const [blinked, setBlinked] = useState(false);
  const lastEyeState = useRef("open");
  const lastBlinkTime = useRef(Date.now());

  const updateEyeState = (leftEyeScore, rightEyeScore) => {
    const isClosed = leftEyeScore < 0.4 && rightEyeScore < 0.4;

    if (lastEyeState.current === "open" && isClosed) {
      lastBlinkTime.current = Date.now();
      setBlinked(true);
    }

    lastEyeState.current = isClosed ? "closed" : "open";
  };

  return {
    blinked,
    updateEyeState,
  };
}
