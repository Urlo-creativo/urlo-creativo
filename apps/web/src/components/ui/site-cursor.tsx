"use client";

import { usePathname } from "next/navigation";
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
  const targetScaleRef = useRef(REST_SCALE);
  const pathname = usePathname();

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

  // Reset the hover state on client-side navigation. The element under the
  // pointer (e.g. a project card link) unmounts mid-hover, so its `mouseout`
  // never fires and the dot would otherwise stay grown until the next hover.
  useEffect(() => {
    targetScaleRef.current = REST_SCALE;
  }, [pathname]);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    if (!dot) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: target.x, y: target.y };
    let scale = REST_SCALE;
    let visible = false;
    let frame = 0;

    function render() {
      pos.x += (target.x - pos.x) / TRAILING;
      pos.y += (target.y - pos.y) / TRAILING;
      scale += (targetScaleRef.current - scale) * SCALE_EASE;
      dot!.style.transform = `translate3d(${pos.x - DOT_SIZE / 2}px, ${
        pos.y - DOT_SIZE / 2
      }px, 0) scale(${scale})`;
      frame = requestAnimationFrame(render);
    }
    frame = requestAnimationFrame(render);

    // Source of truth for hover state: recompute on every move from whatever is
    // actually under the pointer. This self-heals after navigation or async
    // content changes — no reliance on matched mouseover/mouseout pairs.
    function onMove(event: MouseEvent) {
      target.x = event.clientX;
      target.y = event.clientY;
      const el = event.target as Element | null;
      targetScaleRef.current = el?.closest?.(CLICKABLE_SELECTOR)
        ? 1
        : REST_SCALE;
      if (!visible) {
        visible = true;
        dot!.style.opacity = "1";
      }
    }

    function onLeave() {
      visible = false;
      dot!.style.opacity = "0";
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("mousemove", onMove);
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
