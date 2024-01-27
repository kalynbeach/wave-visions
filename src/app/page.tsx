import { Suspense } from "react";
import VisionCanvas from "@/components/vision-canvas";

export default function Home() {
  return (
    // <VisionCanvas />
    <Suspense fallback={<div className="w-full h-full flex justify-center items-center">Loading...</div>}>
      <VisionCanvas />
    </Suspense>
  );
}
