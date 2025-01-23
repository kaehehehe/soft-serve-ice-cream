import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const colorPalette = ["#713600", "#ffb7b7", "#84b067", "#ffffee"];

export function FallingModel({ initialPosition }) {
  const ref = useRef();
  const { scene } = useGLTF("soft-serve-ice-cream.glb");
  const model = scene.clone();

  useEffect(() => {
    if (ref.current) {
      ref.current.position.set(
        initialPosition[0],
        initialPosition[1],
        initialPosition[2]
      );
    }
  }, [initialPosition]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.02;
    }
  });

  useEffect(() => {
    const targetMesh = model.children[2];

    if (targetMesh && targetMesh.isMesh) {
      const randomColor =
        colorPalette[Math.floor(Math.random() * colorPalette.length)];

      targetMesh.material = targetMesh.material.clone();
      targetMesh.material.color.set(randomColor);
    }
  }, [model]);

  return (
    <primitive
      ref={ref}
      scale={0.6}
      object={model}
      position={initialPosition}
    />
  );
}
