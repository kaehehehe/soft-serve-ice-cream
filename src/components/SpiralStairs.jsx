import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Model } from "./Model";

export function SpiralStairs() {
  const iceCreams = useRef([]);
  const [iceCreamCount, setIceCreamCount] = useState(200);
  const radius = 120;
  const heightIncrement = 20;
  const angleIncrement = (Math.PI * 2) / 20;
  const groupRef = useRef();

  useFrame(({ camera }) => {
    const cameraPositionY = camera.position.y;
    const halfHeight = (iceCreamCount * heightIncrement) / 2;

    if (cameraPositionY < -halfHeight) {
      setIceCreamCount((prevCount) => prevCount + 20);
    }
  });

  for (let i = 0; i < iceCreamCount; i++) {
    const angle = i * angleIncrement;
    const positionX = radius * Math.cos(angle);
    const positionZ = radius * Math.sin(angle);
    const positionY = (i - iceCreamCount / 2) * heightIncrement;

    if (!iceCreams.current[i]) {
      iceCreams.current[i] = (
        <Model
          key={`stairs-${i}`}
          colorIndex={i % 5}
          position={[positionX, positionY, positionZ]}
          angle={angle}
        />
      );
    }
  }

  return <group ref={groupRef}>{iceCreams.current}</group>;
}
