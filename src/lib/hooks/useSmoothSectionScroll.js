'use client';

import { useEffect, useRef } from "react";
import { smoothScrollTo } from "@/utils/smoothScrollTo";

export function useSmoothSectionScroll() {
  const isAnimating = useRef(false);
  const index = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll(".section")
    );

    if (!sections.length) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const goTo = (newIndex) => {
      const clamped = Math.max(0, Math.min(newIndex, sections.length - 1));
      index.current = clamped;

      const targetY = sections[clamped].offsetTop;
      isAnimating.current = true;

      if (prefersReducedMotion) {
        window.scrollTo(0, targetY);
        isAnimating.current = false;
      } else {
        smoothScrollTo(targetY, 900);
        setTimeout(() => {
          isAnimating.current = false;
        }, 900);
      }

      // URL sync
      const id = sections[clamped].id;
      if (id) {
        history.replaceState(null, "", `#${id}`);
      }
    };

    // ---------- Wheel ----------
    const onWheel = (e) => {
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }

      if (Math.abs(e.deltaY) < 50) return;

      e.preventDefault();
      goTo(index.current + (e.deltaY > 0 ? 1 : -1));
    };

    // ---------- Touch ----------
    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e) => {
      if (isAnimating.current) return;

      const delta =
        touchStartY.current - e.changedTouches[0].clientY;

      if (Math.abs(delta) < 60) return;

      goTo(index.current + (delta > 0 ? 1 : -1));
    };

    // ---------- Initial index from URL ----------
    const hash = window.location.hash.replace("#", "");
    const startIndex = sections.findIndex(
      (section) => section.id === hash
    );

    if (startIndex >= 0) {
      index.current = startIndex;
      window.scrollTo(0, sections[startIndex].offsetTop);
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);
}
