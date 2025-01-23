import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const colorPalette = ["#6b3e26", "#ffc5d9", "#c2f2d0", "#fdf5c9"];

export function FallingModel({ initialPosition, speed, delay }) {
  const ref = useRef();
  const { scene } = useGLTF("soft-serve-ice-cream.glb");
  const model = scene.clone();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime() + delay;
    ref.current.rotation.y = elapsedTime;
    ref.current.position.y -= speed;

    if (ref.current.position.y < -10) {
      ref.current.position.y = Math.random() * 10 + 10;
      ref.current.position.x = (Math.random() - 0.5) * 20;
      ref.current.position.z = (Math.random() - 0.5) * 20;
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
