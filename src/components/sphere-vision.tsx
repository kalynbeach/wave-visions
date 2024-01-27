"use client";

import { useAtom } from "jotai";
import { audioVolumeAtom } from "@/lib/store";
import Canvas from "@/components/canvas";
import Sphere from "@/components/sphere";

export default function SphereVision() {
  const [volume] = useAtom(audioVolumeAtom);

  return (
    <Canvas>
      <ambientLight />
      {/* <pointLight position={[10, 10, 10]} /> */}
      <Sphere position={[0, 0, 0]} volume={volume} />
    </Canvas>
  );
}