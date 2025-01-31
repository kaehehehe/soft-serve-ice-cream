import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, FlyControls } from "@react-three/drei";
import { SpiralStairs } from "./components/SpiralStairs";
import "./styles.css";

export default function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 5, 0], fov: 75 }}>
        <ambientLight intensity={1} />
        <Environment preset="sunset" />
        <SpiralStairs />
        <FlyControls movementSpeed={250} rollSpeed={0.5} lookSpeed={0.5} />
      </Canvas>
    </>
  );
}
