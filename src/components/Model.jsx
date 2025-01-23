import { useGLTF } from "@react-three/drei";
import React, { forwardRef, useEffect } from "react";

const colorPalette = ["white", "red", "black"];

const Model = forwardRef((props, ref) => {
  const { scene } = useGLTF("soft-serve-ice-cream.glb");

  const getRandomColorIndex = () =>
    Math.floor(Math.random() * colorPalette.length);

  useEffect(() => {
    if (scene.children[2]) {
      const mesh = scene.children[2];

      const randomColorIndex = getRandomColorIndex();
      mesh.material.emissive.set(colorPalette[randomColorIndex]);
      mesh.material.emissiveIntensity = 1;
    }
  }, [scene]);

  return (
    <mesh ref={ref} {...props}>
      <primitive object={scene.clone()} />
    </mesh>
  );
});

export default Model;
