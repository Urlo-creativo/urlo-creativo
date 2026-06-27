"use client";

import { useEffect, useRef, useState } from "react";

const VIEWPORT_OPTIONS: IntersectionObserverInit = {
  rootMargin: "160px 0px",
  threshold: 0.25,
};

type ViewportAutoplayVideoProps = {
  src: string;
  mimeType?: string;
  poster?: string;
  className?: string;
  preload?: "auto" | "metadata" | "none";
};

export function ViewportAutoplayVideo({
  src,
  mimeType,
  poster,
  className,
  preload = "metadata",
}: ViewportAutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        void video.play().catch(() => {
          // Browsers can still block autoplay in edge cases. Keep the video quiet.
        });
        return;
      }

      video.pause();
    }, VIEWPORT_OPTIONS);

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload={preload}
      poster={poster}
      className={className}
    >
      <source src={src} type={mimeType} />
    </video>
  );
}

type ViewportAutoplayEmbedProps = {
  src: string;
  title: string;
  className?: string;
};

export function ViewportAutoplayEmbed({
  src,
  title,
  className,
}: ViewportAutoplayEmbedProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsLoaded(Boolean(entry?.isIntersecting));
    }, VIEWPORT_OPTIONS);

    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frameRef} className={className}>
      {isLoaded && (
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      )}
    </div>
  );
}
