import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Color } from "three";
import { FallingModel } from "./components/FallingModel";
import "./styles.css";

const rows = 25;
const cols = 25;
const spacing = 1.7;

export default function App() {
  const initialY = 0;

  const models = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      models.push({
        position: [
          col * spacing - (cols * spacing) / 2 + spacing / 2,
          initialY,
          row * spacing - (rows * spacing) / 2 + spacing / 2,
        ],
      });
    }
  }

  return (
    <Canvas camera={{ fov: 60, position: [0, 5, 0], near: 1, far: 100 }}>
      <color attach="background" args={[new Color("#FDFFF5")]} />
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={1}
        maxDistance={10}
        maxPolarAngle={Math.PI / 2}
      />
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 10]} intensity={0.8} />
      <Environment preset="sunset" />
      {models.map((model, i) => (
        <FallingModel key={i} initialPosition={model.position} />
      ))}
    </Canvas>
  );
}
