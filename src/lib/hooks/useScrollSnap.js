'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

export function useScrollSnap() {
  // ───────── Scroll tracking ─────────
  const lastY = useRef(null);
  const lastTime = useRef(null);
  const velocityHistory = useRef([]);
  const hasSnapped = useRef(false);

  const SNAP_THRESHOLD = 0.3; // px/ms
  const HISTORY_LENGTH = 5;
  const SCROLL_END_DELAY = 120; // ms
  const scrollEndTimeout = useRef(null);

  // ───────── Touch intent ─────────
  const touchStartY = useRef(null);
  const touchStartTime = useRef(null);
  const wasFastSwipe = useRef(false);
  const swipeDirection = useRef(null);
  const SWIPE_FAST_THRESHOLD = 0.6;

  // ───────── Section tracking ─────────
  const sectionInViewRef = useRef(0);
  const nextRef = useRef(1);
  const prevRef = useRef(null);

  // ───────── Helper: handle touch start ─────────
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = performance.now();
  };

  // ───────── Helper: handle touch end ─────────
  const handleTouchEnd = (e) => {
    if (touchStartY.current === null) return;

    const endY = e.changedTouches[0].clientY;
    const endTime = performance.now();

    const dy = endY - touchStartY.current;
    const dt = endTime - touchStartTime.current;

    const swipeVelocity = Math.abs(dy / dt); // px/ms
    wasFastSwipe.current = swipeVelocity > SWIPE_FAST_THRESHOLD;
    swipeDirection.current = dy < 0 ? 'down' : 'up';

    console.log(
      wasFastSwipe.current ? 'FAST swipe' : 'SLOW swipe',
      swipeDirection.current,
      swipeVelocity.toFixed(2)
    );

    touchStartY.current = null;
    touchStartTime.current = null;
  };

  // ───────── Helper: calculate average velocity ─────────
  const calculateVelocity = (y, now) => {
    if (lastY.current === null) {
      lastY.current = y;
      lastTime.current = now;
      return null;
    }

    const dy = y - lastY.current;
    const dt = now - lastTime.current;
    if (dt === 0) return null;

    const velocity = dy / dt; // signed px/ms
    velocityHistory.current.push(velocity);
    if (velocityHistory.current.length > HISTORY_LENGTH) {
      velocityHistory.current.shift();
    }

    lastY.current = y;
    lastTime.current = now;

    const avgVelocity =
      velocityHistory.current.reduce((a, b) => a + b, 0) /
      velocityHistory.current.length;

    return avgVelocity;
  };

  // ───────── Helper: reset snap ─────────
  const resetSnap = () => {
    hasSnapped.current = false;
    wasFastSwipe.current = false;
    swipeDirection.current = null;
    velocityHistory.current = [];
  };

  // ───────── Helper: scroll to section with organic momentum ─────────
  const scrollToSection = (direction, currentVelocity = 0) => {
    const sections = document.querySelectorAll('[data-section]');
    if (!sections.length) return;

    let targetIndex;
    if (direction === 'down') {
      targetIndex = nextRef.current;
      if (targetIndex > sections.length - 1) return;
    } else if (direction === 'up') {
      targetIndex = prevRef.current;
      if (targetIndex < 0) return;
    }

    const currentY = window.scrollY;
    const targetY = sections[targetIndex].offsetTop;

    // Organic spring: start at current position + small offset in swipe direction
    // Velocity scaled to px/s
const initialVelocity = currentVelocity * 1000; // px/s
const velocityScale = 0.5; // reduce start speed
const offset = initialVelocity * 0.01; // smaller pickup
const startY = currentY + offset;

animate(startY, targetY, {
  type: 'spring',
  stiffness: 120,
  damping: 20,
  velocity: initialVelocity * velocityScale,
  onUpdate: (latest) => window.scrollTo(0, latest),
});
    // Update section refs
    sectionInViewRef.current = targetIndex;
    nextRef.current = sectionInViewRef.current + 1;
    prevRef.current = sectionInViewRef.current - 1;
  };

  // ───────── Helper: check if snap should fire ─────────
  const checkSnap = (avgVelocity) => {
    if (
      avgVelocity !== null &&
      Math.abs(avgVelocity) < SNAP_THRESHOLD &&
      wasFastSwipe.current &&
      !hasSnapped.current
    ) {
      hasSnapped.current = true;
      console.log('Snap triggered! Direction:', swipeDirection.current);

      scrollToSection(swipeDirection.current, avgVelocity);
    }
  };

  // ───────── Effect: attach listeners ─────────
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onScroll = () => {
      const now = performance.now();
      const y = window.scrollY;

      const avgVelocity = calculateVelocity(y, now);
      checkSnap(avgVelocity);

      clearTimeout(scrollEndTimeout.current);
      scrollEndTimeout.current = setTimeout(resetSnap, SCROLL_END_DELAY);
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', onScroll);
      clearTimeout(scrollEndTimeout.current);
    };
  }, []);
}
