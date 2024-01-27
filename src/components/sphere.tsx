"use client";

import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useFrame, ThreeElements } from "@react-three/fiber";
import { useAtom } from "jotai";
import { visionModifiersAtom } from "@/lib/store";


type Props = ThreeElements["mesh"] & {
  volume?: number;
}

export default function Sphere(props: Props) {
  const ref = useRef<THREE.Mesh>(null!);
  const [visionModifiers] = useAtom(visionModifiersAtom);
  
  useFrame((state, delta) => {
    ref.current.rotation.x = 1.57;
    ref.current.rotation.y -= 0.00128 * Math.max(visionModifiers.agility, 1);
    ref.current.rotation.z -= 0.0064 * visionModifiers.intellect;
    // ref.current.rotation.z -= -(visionModifiers.intellect / 512);

    let strMod = Math.max(visionModifiers.strength * 0.0064, 0.064);

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