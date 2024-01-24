"use client";

import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useFrame, ThreeElements } from "@react-three/fiber";
import { useVision } from "@/contexts/vision";

type Props = ThreeElements["mesh"] & {
  volume?: number;
}

export default function Sphere(props: Props) {
  const ref = useRef<THREE.Mesh>(null!);
  const [vision] = useVision();
  
  useFrame((state, delta) => {
    ref.current.rotation.x = 1.57;
    ref.current.rotation.y -= 0.00128 * Math.max(vision.agility, 1);
    ref.current.rotation.z -= 0.0064 * vision.intellect;
    // ref.current.rotation.z -= -(vision.intellect / 512);

    let strMod = Math.max(vision.strength * 0.064, 0.064);

    if (props.volume) {
      let volScale = (props.volume * strMod) / 8;
      ref.current.scale.x = 1 + volScale;
      ref.current.scale.y = 1 + volScale;
      ref.current.scale.z = 1 + volScale;
    } else {
      ref.current.scale.x = 1 + strMod;
      ref.current.scale.y = 1 + strMod;
      ref.current.scale.z = 1 + strMod;
    }
  });
  
  return (
    <mesh {...props} ref={ref}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color={"#1AE803"}
        wireframe
      />
    </mesh>
  );
}