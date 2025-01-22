import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Color } from "three";
import { FallingModel } from "./components/FallingModel";
import "./styles.css";

const modelCount = 80;

export default function App() {
  const models = Array.from({ length: modelCount }).map(() => {
    const initialY = Math.random() * 10 + 10;
    const speed = Math.random() * 0.03 + 0.01;
    const delay = Math.random() * 2;

    return {
      position: [
        (Math.random() - 0.5) * 20,
        initialY,
        (Math.random() - 0.5) * 20,
      ],
      speed: speed,
      delay: delay,
    };
  });

  return (
    <Canvas camera={{ fov: 60, position: [0, 0, 10], near: 1, far: 1000 }}>
      <color attach="background" args={[new Color("#FFFBE7")]} />

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={1}
        maxDistance={10}
        maxPolarAngle={Math.PI / 2}
      />
      <ambientLight intensity={0.3} />
      <Environment preset="sunset" />
      {models.map((model, i) => (
        <FallingModel
          key={i}
          initialPosition={model.position}
          speed={model.speed}
          delay={model.delay}
        />
      ))}
    </Canvas>
  );
}
