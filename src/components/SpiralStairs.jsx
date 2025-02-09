import { useFrame } from "@react-three/fiber";
import { useRef, useState, useMemo } from "react";
import { Model } from "./Model";

const RADIUS = 120;
const HEIGHT_INCREMENT = 20;
const ANGLE_INCREMENT = (Math.PI * 2) / 20;
const INITIAL_ICE_CREAM_COUNT = 200;
const ICE_CREAM_INCREMENT = 20;

export function SpiralStairs() {
  const iceCreams = useRef([]);
  const [iceCreamCount, setIceCreamCount] = useState(INITIAL_ICE_CREAM_COUNT);
  const groupRef = useRef();

  useFrame(({ camera }) => {
    const cameraPositionY = camera.position.y;
    const halfHeight = (iceCreamCount * HEIGHT_INCREMENT) / 2;

    if (cameraPositionY < -halfHeight) {
      setIceCreamCount((prevCount) => prevCount + ICE_CREAM_INCREMENT);
    }
  });

  const generateIceCreamModels = (count) => {
    return Array.from({ length: count }, (_, i) => {
      const angle = i * ANGLE_INCREMENT;
      const positionX = RADIUS * Math.cos(angle);
      const positionZ = RADIUS * Math.sin(angle);
      const positionY = (i - count / 2) * HEIGHT_INCREMENT;

      return (
        <Model
          key={`stairs-${i}`}
          colorIndex={i % 5}
          position={[positionX, positionY, positionZ]}
          angle={angle}
        />
      );
    });
  };

  iceCreams.current = useMemo(
    () => generateIceCreamModels(iceCreamCount),
    [iceCreamCount]
  );

  return <group ref={groupRef}>{iceCreams.current}</group>;
}
