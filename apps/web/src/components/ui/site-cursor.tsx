"use client";

import { useEffect, useRef, useState } from "react";

const CLICKABLE_SELECTOR =
  'a, button, input[type="button"], input[type="submit"], label[for], select, textarea, [role="button"]';

const REST_SIZE = 32; // visible diameter at rest
const HOVER_SCALE = 2.2; // growth factor over clickables
// Rasterize the dot at its largest size and only ever scale DOWN to the resting
// size. Scaling a layer up blurs/aliases its bitmap; scaling down stays crisp.
const DOT_SIZE = Math.round(REST_SIZE * HOVER_SCALE);
const REST_SCALE = REST_SIZE / DOT_SIZE;
const TRAILING = 8; // higher = more lag behind the pointer
const SCALE_EASE = 0.18;

export function SiteCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const touchQuery = window.matchMedia("(any-pointer: coarse)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function syncEnabled() {
      const hasTouch = navigator.maxTouchPoints > 0 || touchQuery.matches;
      setEnabled(pointerQuery.matches && !hasTouch && !motionQuery.matches);
    }

    syncEnabled();
    pointerQuery.addEventListener("change", syncEnabled);
    touchQuery.addEventListener("change", syncEnabled);
    motionQuery.addEventListener("change", syncEnabled);

    return () => {
      pointerQuery.removeEventListener("change", syncEnabled);
      touchQuery.removeEventListener("change", syncEnabled);
      motionQuery.removeEventListener("change", syncEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    if (!dot) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: target.x, y: target.y };
    let scale = REST_SCALE;
    let targetScale = REST_SCALE;
    let visible = false;
    let frame = 0;

    function render() {
      pos.x += (target.x - pos.x) / TRAILING;
      pos.y += (target.y - pos.y) / TRAILING;
      scale += (targetScale - scale) * SCALE_EASE;
      dot!.style.transform = `translate3d(${pos.x - DOT_SIZE / 2}px, ${
        pos.y - DOT_SIZE / 2
      }px, 0) scale(${scale})`;
      frame = requestAnimationFrame(render);
    }
    frame = requestAnimationFrame(render);

    function onMove(event: MouseEvent) {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!visible) {
        visible = true;
        dot!.style.opacity = "1";
      }
    }

    function onLeave() {
      visible = false;
      dot!.style.opacity = "0";
    }

    // Event delegation: works for every current and future clickable element,
    // including async (Sanity) content and client-side route changes.
    function onOver(event: MouseEvent) {
      const el = event.target as Element | null;
      if (el?.closest?.(CLICKABLE_SELECTOR)) targetScale = 1;
    }

    function onOut(event: MouseEvent) {
      const el = event.target as Element | null;
      if (!el?.closest?.(CLICKABLE_SELECTOR)) return;
      const next = event.relatedTarget as Element | null;
      if (!next?.closest?.(CLICKABLE_SELECTOR)) targetScale = REST_SCALE;
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: "50%",
        backgroundColor: "#ffffff",
        mixBlendMode: "difference",
        pointerEvents: "none",
        opacity: 0,
        willChange: "transform",
        zIndex: 2147483647,
      }}
    />
  );
}
