"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { PLACEHOLDER_IMAGE } from "@/content/placeholders";

type Client = {
  logo: string | null;
  name: string;
  url?: string | null;
};

type ClientMarqueeProps = {
  clients: readonly Client[];
};

const SPEED_PX_PER_SECOND = 72;
const MIN_REPEAT_COUNT = 3;

export function ClientMarquee({ clients }: ClientMarqueeProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cycleRef = useRef<HTMLDivElement>(null);
  const distanceRef = useRef(0);
  const offsetRef = useRef(0);
  const [repeatCount, setRepeatCount] = useState(MIN_REPEAT_COUNT);

  const groups = useMemo(
    () => Array.from({ length: repeatCount }, (_, index) => index),
    [repeatCount],
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    const cycle = cycleRef.current;

    if (!viewport || !cycle) return;

    const updateMetrics = () => {
      const cycleWidth = cycle.scrollWidth;
      const viewportWidth = viewport.clientWidth;

      if (cycleWidth <= 0 || viewportWidth <= 0) return;

      distanceRef.current = cycleWidth;
      setRepeatCount(
        Math.max(MIN_REPEAT_COUNT, Math.ceil(viewportWidth / cycleWidth) + 2),
      );
    };

    updateMetrics();

    const resizeObserver = new ResizeObserver(updateMetrics);
    resizeObserver.observe(viewport);
    resizeObserver.observe(cycle);
    window.addEventListener("load", updateMetrics);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("load", updateMetrics);
    };
  }, [repeatCount]);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      track.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    let frame = 0;
    let previousTime: number | null = null;

    const tick = (time: number) => {
      if (previousTime === null) {
        previousTime = time;
      }

      const distance = distanceRef.current;
      const deltaSeconds = (time - previousTime) / 1000;
      previousTime = time;

      if (distance > 0) {
        offsetRef.current =
          (offsetRef.current + deltaSeconds * SPEED_PX_PER_SECOND) % distance;
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      frame = window.requestAnimationFrame(tick);
    };

    const handleVisibilityChange = () => {
      previousTime = null;
    };

    frame = window.requestAnimationFrame(tick);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      ref={viewportRef}
      className="client-marquee-viewport mt-16 bg-yellow py-10 md:py-[54px]"
    >
      <div className="sr-only" aria-label="Selected clients">
        {clients.map((client) =>
          client.url ? (
            <a key={client.name} href={client.url}>
              {client.name}
            </a>
          ) : (
            <span key={client.name}>{client.name}</span>
          ),
        )}
      </div>

      <div ref={trackRef} className="client-marquee-track" aria-hidden="true">
        {groups.map((groupIndex) => (
          <div
            key={groupIndex}
            ref={groupIndex === 0 ? cycleRef : undefined}
            className="client-marquee-group"
          >
            {clients.map((client) => {
              const logo = (
                <span className="client-marquee-logo-frame">
                  <Image
                    src={client.logo ?? PLACEHOLDER_IMAGE}
                    alt=""
                    width={280}
                    height={120}
                    className="client-marquee-logo"
                  />
                </span>
              );

              return client.url ? (
                <a
                  key={`${groupIndex}-${client.name}`}
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={-1}
                  className="client-marquee-item block transition-opacity duration-300 hover:opacity-60"
                >
                  {logo}
                </a>
              ) : (
                <div
                  key={`${groupIndex}-${client.name}`}
                  className="client-marquee-item"
                >
                  {logo}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
