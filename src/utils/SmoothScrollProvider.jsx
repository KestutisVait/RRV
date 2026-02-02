'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScrollProvider({ containerRef, children }) {
  useEffect(() => {
    if (!containerRef?.current) return;

    const container = containerRef.current;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => t,
      smooth: true,
      smoothTouch: true,
      touchMultiplier: 1.2,
      direction: 'vertical',
      gestureOrientation: 'vertical',
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 👇 IMPORTANT: query ONLY inside <main>
    const sections = container.querySelectorAll('.section');
    console.log(sections);
    

    if (!sections.length) return;

    let snapTimeout;

    lenis.on('scroll', ({ scroll }) => {
      clearTimeout(snapTimeout);

      snapTimeout = setTimeout(() => {
        let closest = sections[0];
        let minDistance = Math.abs(
          sections[0].offsetTop - scroll
        );

        sections.forEach((section) => {
          const distance = Math.abs(section.offsetTop - scroll);
          if (distance < minDistance) {
            minDistance = distance;
            closest = section;
          }
        });

        lenis.scrollTo(closest, {
          duration: 1.1,
          easing: (t) => 1 - Math.pow(1 - t, 3), // easeOut
        });
      }, 120); // snap AFTER user stops
    });

    return () => {
      clearTimeout(snapTimeout);
      lenis.destroy();
    };
  }, [containerRef]);

  return children;
}
