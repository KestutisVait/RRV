'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

export function useObserverSnap() {
  const observerRef = useRef(null);
  const isSnapping = useRef(false);
  const lastVelocity = useRef(0);
  const swipeStartY = useRef(null);
  const swipeStartTime = useRef(null);
  const swipeDirection = useRef(null);

  const STIFFNESS = 120;
  const DAMPING = 20;
  const VELOCITY_SCALE = 0.5;
  const OFFSET_SCALE = 0.02;

  const FAST_VELOCITY = 0.5; // px/ms
  const FAST_DISTANCE = 50;  // px

  // ───────── Touch handlers ─────────
  const handleTouchStart = (e) => {
    swipeStartY.current = e.touches[0].clientY;
    swipeStartTime.current = performance.now();
  };

  const handleTouchEnd = (e) => {
    if (swipeStartY.current === null) return;

    const endY = e.changedTouches[0].clientY;
    const endTime = performance.now();

    const dy = endY - swipeStartY.current;
    const dt = endTime - swipeStartTime.current;

    const velocity = Math.abs(dy / dt);
    const distance = Math.abs(dy);

    if (velocity > FAST_VELOCITY && distance > FAST_DISTANCE) {
      lastVelocity.current = velocity;
      swipeDirection.current = dy < 0 ? 'down' : 'up';
      console.log('Fast swipe detected', swipeDirection.current, velocity.toFixed(2));
    } else {
      lastVelocity.current = 0;
      swipeDirection.current = null;
    }

    swipeStartY.current = null;
    swipeStartTime.current = null;
  };

  // ───────── Snap function ─────────
  const snapToSection = (section) => {
    if (isSnapping.current) return;
    isSnapping.current = true;

    const currentY = window.scrollY;
    const targetY = section.offsetTop;

    const initialVelocity = lastVelocity.current * 1000 * VELOCITY_SCALE;
    const offset = initialVelocity * OFFSET_SCALE;
    const startY = currentY + offset;

    animate(startY, targetY, {
      type: 'spring',
      stiffness: STIFFNESS,
      damping: DAMPING,
      velocity: initialVelocity,
      onUpdate: (latest) => window.scrollTo(0, latest),
      onComplete: () => {
        isSnapping.current = false;
        lastVelocity.current = 0;
      },
    });
  };

  // ───────── Effect ─────────
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const setupObserver = () => {
      const sections = document.querySelectorAll('[data-section]');
      // console.log('Observed sections:', sections);

      if (!sections.length) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              snapToSection(entry.target);
            }
          });
        },
        { threshold: [0.3, 0.5] }
      );

      sections.forEach((section) => observerRef.current.observe(section));
    };

    // small timeout to let DOM fully render
    const timeout = setTimeout(setupObserver, 50);

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      clearTimeout(timeout);
      if (observerRef.current) observerRef.current.disconnect();
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);
}
