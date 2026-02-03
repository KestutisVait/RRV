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

  const SWIPE_FAST_VELOCITY = 0.5; // px/ms
  const SWIPE_FAST_DISTANCE = 50;  // px

  // ───────── Section tracking ─────────
  const sectionInViewRef = useRef(0);
  const nextRef = useRef(1);
  const prevRef = useRef(null);

  // ───────── rAF throttling ─────────
  const ticking = useRef(false);

  // ───────── Touch handlers ─────────
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = performance.now();
  };

  const handleTouchEnd = (e) => {
    if (touchStartY.current === null) return;

    const endY = e.changedTouches[0].clientY;
    const endTime = performance.now();

    const dy = endY - touchStartY.current;
    const dt = endTime - touchStartTime.current;

    const velocity = Math.abs(dy / dt); // px/ms
    const distance = Math.abs(dy);

    // iOS-style fast swipe detection
    wasFastSwipe.current =
      velocity > SWIPE_FAST_VELOCITY && distance > SWIPE_FAST_DISTANCE;

    swipeDirection.current = dy < 0 ? 'down' : 'up';

    console.log(
      wasFastSwipe.current ? 'FAST swipe' : 'SLOW swipe',
      swipeDirection.current,
      velocity.toFixed(2),
      distance
    );

    touchStartY.current = null;
    touchStartTime.current = null;
  };

  // ───────── Velocity tracking ─────────
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

  const resetSnap = () => {
    hasSnapped.current = false;
    wasFastSwipe.current = false;
    swipeDirection.current = null;
    velocityHistory.current = [];
  };

  // ───────── Snap & scroll ─────────
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

    // Softened velocity for organic feel
    const velocityScale = 0.5; // start slower than actual swipe
    const initialVelocity = currentVelocity * 1000 * velocityScale; // px/s
    const offset = initialVelocity * 0.02; // tiny buffer in swipe direction
    const startY = currentY + offset;

    animate(startY, targetY, {
      type: 'spring',
      stiffness: 120,
      damping: 20,
      velocity: initialVelocity,
      onUpdate: (latest) => window.scrollTo(0, latest),
    });

    // Update section refs
    sectionInViewRef.current = targetIndex;
    nextRef.current = sectionInViewRef.current + 1;
    prevRef.current = sectionInViewRef.current - 1;
  };

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

  // ───────── Effect ─────────
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          const now = performance.now();
          const y = window.scrollY;

          const avgVelocity = calculateVelocity(y, now);
          checkSnap(avgVelocity);

          // Reset after scroll ends
          clearTimeout(scrollEndTimeout.current);
          scrollEndTimeout.current = setTimeout(resetSnap, SCROLL_END_DELAY);

          ticking.current = false;
        });
      }
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
