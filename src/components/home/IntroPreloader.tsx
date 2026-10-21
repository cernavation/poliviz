"use client";
import { useState } from "react";

export function IntroPreloader() {
  const [isEnded, setIsEnded] = useState(false);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-1000 ${
        isEnded ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden={isEnded}
    >
      <video
        src="/media/video/poliviz-intro.mp4"
        autoPlay
        muted
        playsInline
        onEnded={() => setIsEnded(true)}
        className="max-w-3xl w-full"
      />
    </div>
  );
}

export default IntroPreloader;
