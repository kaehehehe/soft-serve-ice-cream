import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";

const ICE_CREAM_COLORS = [
  "#f93d48",
  "#00a4ef",
  "#fbb02d",
  "#713600",
  "#F9F9F3",
];

const getColor = (index) => {
  return ICE_CREAM_COLORS[index] || ICE_CREAM_COLORS[0];
};

export function Model({ colorIndex, position, angle }) {
  const { scene } = useGLTF("soft-serve-ice-cream.glb");
  const model = scene.clone();
  const ref = useRef();

  useEffect(() => {
    const targetMesh = model.children[2];
    const color = getColor(colorIndex);

    targetMesh.material = targetMesh.material.clone();
    targetMesh.material.color.set(color);
  }, [model]);

  return (
    <primitive
      ref={ref}
      position={position}
      object={model}
      scale={20}
      rotation={[0, angle, 0]}
    />
  );
}
