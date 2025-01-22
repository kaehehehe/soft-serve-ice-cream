import { useGLTF } from "@react-three/drei";
import React, { forwardRef, useEffect, useState } from "react";

const colorPalette = ["white", "red", "black"]; // 색상 팔레트 추가

// 색상 팔레트 추가

const Model = forwardRef((props, ref) => {
  const { scene } = useGLTF("soft-serve-ice-cream.glb");

  // 랜덤 색상 인덱스 생성
  const getRandomColorIndex = () =>
    Math.floor(Math.random() * colorPalette.length);

  useEffect(() => {
    if (scene.children[2]) {
      const mesh = scene.children[2];

      const randomColorIndex = getRandomColorIndex();
      mesh.material.emissive.set(colorPalette[randomColorIndex]); // 빛 컬러 설정
      mesh.material.emissiveIntensity = 1; // 빛의 강도 설정
    }
  }, [scene]);

  return (
    <mesh ref={ref} {...props}>
      <primitive object={scene.clone()} />
    </mesh>
  );
});

export default Model;
