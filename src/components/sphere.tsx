"use client";

import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useFrame, ThreeElements } from "@react-three/fiber";

type Props = ThreeElements["mesh"] & {
  volume?: number;
}

export default function Sphere(props: Props) {
  const ref = useRef<THREE.Mesh>(null!);
  
  useFrame((state, delta) => {
    ref.current.rotation.x = 1.57;
    ref.current.rotation.y -= 0.00093;

    if (props.volume) {
      const _scale = Math.max(props.volume * 0.024, 1)
      ref.current.scale.x = _scale;
      ref.current.scale.y = _scale;
      ref.current.scale.z = _scale;
      // ref.current.rotation.y -= 0.003;
      // ref.current.rotation.y -= _scale * 0.003;
    } else {
      ref.current.scale.x = 1;
      ref.current.scale.y = 1;
      ref.current.scale.z = 1;
      // ref.current.rotation.y -= 0.003;
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