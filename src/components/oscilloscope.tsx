"use client";

import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useFrame, ThreeElements } from "@react-three/fiber";
import { Line2 } from "three-stdlib";
import { Line } from "@react-three/drei";
import { AudioProcessor } from "@/lib/audio";

type OscilloscopeProps = ThreeElements["lineBasicMaterial"] & {
  data: Float32Array;
};

export default function Oscilloscope({ data }: OscilloscopeProps) {
  const ref = useRef<Line2>(null);

  // useFrame((state, delta) => {
  //   if (ref.current) {
  //     // const data = audioProcessor.getWaveformData();
  //     const positions = ref.current.geometry.attributes.position.array as Float32Array;
      
  //     for (let i = 0, j = 0; i < data.length; i++, j += 3) {
  //       positions[j] = i / data.length * 2 - 1; // x
  //       positions[j + 1] = data[i];             // y
  //       positions[j + 2] = 0;                   // z
  //     }
      
  //     ref.current.geometry.attributes.position.needsUpdate = true;
  //   }
  // });

  return (
    <Line
      ref={ref}
      points={Array(512).fill([0, 0, 0])} // Initial points
      color="white"
      lineWidth={1}
    />
    // <Line ref={ref}>
    //   <bufferGeometry attach="geometry">
    //     <bufferAttribute 
    //       attachObject={['attributes', 'position']} 
    //       count={512} 
    //       array={new Float32Array(512 * 3)} 
    //       itemSize={3} 
    //     />
    //   </bufferGeometry>
    //   <lineBasicMaterial attach="material" color="white" />
    // </Line>
  )
}